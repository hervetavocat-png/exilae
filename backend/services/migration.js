const db = require('./database');
const fs = require('fs');
const path = require('path');

class MigrationService {
  // Exécuter la migration pour ajouter document_url
  static async addDocumentUrlColumns() {
    try {
      console.log('🔧 Exécution de la migration : ajout des colonnes document_url...');

      // Ajouter document_url à contact_forms
      await db.query(`
        ALTER TABLE contact_forms 
        ADD COLUMN IF NOT EXISTS document_url TEXT;
      `);

      // Ajouter document_url à consultation_requests
      await db.query(`
        ALTER TABLE consultation_requests 
        ADD COLUMN IF NOT EXISTS document_url TEXT;
      `);

      // Ajouter document_url à oqtf_urgence
      await db.query(`
        ALTER TABLE oqtf_urgence 
        ADD COLUMN IF NOT EXISTS document_url TEXT;
      `);

      console.log('✅ Migration terminée : colonnes document_url ajoutées');

      // Vérification
      const result = await db.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'consultation_requests' 
        AND column_name = 'document_url';
      `);

      if (result.rows.length > 0) {
        console.log('✅ Vérification : colonne document_url présente dans consultation_requests');
      } else {
        console.log('⚠️ Attention : colonne document_url non trouvée');
      }

      return true;
    } catch (error) {
      console.error('❌ Erreur lors de la migration:', error);
      return false;
    }
  }

  // Lister toutes les colonnes d'une table
  static async listTableColumns(tableName) {
    try {
      const result = await db.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = $1
        ORDER BY ordinal_position;
      `, [tableName]);

      console.log(`📋 Colonnes de la table ${tableName}:`);
      result.rows.forEach(col => {
        console.log(`  • ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? '- nullable' : '- required'}`);
      });

      return result.rows;
    } catch (error) {
      console.error(`❌ Erreur lors de la liste des colonnes de ${tableName}:`, error);
      return [];
    }
  }
}

module.exports = MigrationService;
