// Script pour exécuter les migrations manuellement
require('dotenv').config();
const MigrationService = require('./services/migration');

async function runMigration() {
  console.log('🔧 Démarrage de la migration...');
  
  try {
    // Ajouter les colonnes document_url
    const success = await MigrationService.addDocumentUrlColumns();
    
    if (success) {
      console.log('✅ Migration réussie !');
      
      // Lister les colonnes pour vérification
      console.log('\n📋 Vérification des tables :');
      await MigrationService.listTableColumns('contact_forms');
      console.log('');
      await MigrationService.listTableColumns('consultation_requests');
      
    } else {
      console.log('❌ Migration échouée');
    }
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
  
  process.exit(0);
}

runMigration();
