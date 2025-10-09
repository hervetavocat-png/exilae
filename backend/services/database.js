const { Pool } = require('pg');
require('dotenv').config();

class DatabaseService {
  constructor() {
    this.initializePool();
  }
  
  initializePool() {
    const connectionString = process.env.DATABASE_POOLER_URL || process.env.DATABASE_URL;
    
    if (!connectionString) {
      console.error('❌ DATABASE_URL ou DATABASE_POOLER_URL non défini dans .env');
      throw new Error('DATABASE_URL ou DATABASE_POOLER_URL non défini');
    }
    
    // Fermer le pool existant s'il y en a un
    if (this.pool) {
      this.pool.end().catch(err => console.error('Erreur fermeture pool:', err));
    }
    
    // Créer un nouveau pool avec SSL activé pour Supabase
    this.pool = new Pool({
      connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false
      },
      // Options supplémentaires pour stabilité
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000
    });
    
    // Gérer les erreurs du pool
    this.pool.on('error', (err) => {
      console.error('❌ Erreur inattendue du pool de connexions:', err);
    });
    
    console.log('🔌 DatabaseService initialisé avec SSL activé');
  }

  // Méthode pour exécuter des requêtes
  async query(text, params) {
    if (!this.pool) {
      this.initializePool();
    }
    
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } catch (error) {
      console.error('❌ Erreur requête DB:', error.message);
      throw error;
    } finally {
      client.release();
    }
  }

  // Vérifier si une table existe
  async tableExists(tableName) {
    const query = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      );
    `;
    const result = await this.query(query, [tableName]);
    return result.rows[0].exists;
  }

  // Créer une table si elle n'existe pas
  async createTableIfNotExists(tableName, createTableSQL) {
    try {
      const exists = await this.tableExists(tableName);
      
      if (!exists) {
        console.log(`📝 Création de la table '${tableName}'...`);
        await this.query(createTableSQL);
        console.log(`✅ Table '${tableName}' créée avec succès`);
      } else {
        console.log(`ℹ️  Table '${tableName}' existe déjà`);
      }
    } catch (error) {
      console.error(`❌ Erreur lors de la création de la table '${tableName}':`, error);
      throw error;
    }
  }

  // Initialiser toutes les tables nécessaires
  async initializeTables() {
    console.log('🔧 Initialisation des tables de la base de données...');
    
    // Table pour les formulaires de contact
    await this.createTableIfNotExists('contact_forms', `
      CREATE TABLE contact_forms (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telephone VARCHAR(50),
        sujet VARCHAR(255),
        message TEXT NOT NULL,
        type_formulaire VARCHAR(100) DEFAULT 'contact',
        document_url TEXT,
        ip_address INET,
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Table pour les demandes de consultation
    await this.createTableIfNotExists('consultation_requests', `
      CREATE TABLE consultation_requests (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        prenom VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telephone VARCHAR(50) NOT NULL,
        date_naissance DATE,
        nationalite VARCHAR(100),
        situation_actuelle TEXT,
        type_procedure VARCHAR(100),
        urgence_niveau VARCHAR(50) DEFAULT 'normal',
        ville_consultation VARCHAR(100),
        date_souhaitee DATE,
        heure_souhaitee TIME,
        message_complementaire TEXT,
        document_url TEXT,
        documents_fournis JSON,
        statut VARCHAR(50) DEFAULT 'nouveau',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Table pour les demandes d'urgence OQTF
    await this.createTableIfNotExists('oqtf_urgence', `
      CREATE TABLE oqtf_urgence (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        prenom VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telephone VARCHAR(50) NOT NULL,
        date_naissance DATE,
        nationalite VARCHAR(100),
        numero_oqtf VARCHAR(100),
        date_reception_oqtf DATE,
        type_oqtf VARCHAR(100),
        delai_restant INTEGER,
        prefecture VARCHAR(100),
        situation_familiale TEXT,
        enfants_scolarises BOOLEAN DEFAULT FALSE,
        emploi_actuel TEXT,
        duree_sejour_france INTEGER,
        documents_disponibles JSON,
        description_situation TEXT,
        aide_juridictionnelle BOOLEAN DEFAULT FALSE,
        statut VARCHAR(50) DEFAULT 'urgent',
        priorite INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Table pour les avis juridiques
    await this.createTableIfNotExists('avis_juridiques', `
      CREATE TABLE avis_juridiques (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        prenom VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telephone VARCHAR(50),
        type_demande VARCHAR(100) NOT NULL,
        description_situation TEXT NOT NULL,
        documents_joints JSON,
        urgence BOOLEAN DEFAULT FALSE,
        budget_estime DECIMAL(10,2),
        statut VARCHAR(50) DEFAULT 'en_attente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Table pour les newsletters
    await this.createTableIfNotExists('newsletter_subscriptions', `
      CREATE TABLE newsletter_subscriptions (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        nom VARCHAR(255),
        prenom VARCHAR(255),
        interets JSON,
        statut VARCHAR(50) DEFAULT 'actif',
        date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        date_desabonnement TIMESTAMP,
        source VARCHAR(100),
        ip_address INET
      );
    `);

    console.log('✅ Initialisation des tables terminée');
  }

  // Fermer la connexion
  async close() {
    await this.pool.end();
  }
}

module.exports = new DatabaseService();
