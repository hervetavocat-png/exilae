const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

// Import des routes
const formsRoutes = require('./routes/forms');
const consultationsRoutes = require('./routes/consultations');
const oqtfRoutes = require('./routes/oqtf');
const newsletterRoutes = require('./routes/newsletter');
const blogRoutes = require('./routes/blog');

// Routes d'upload intégrées directement dans le serveur

// Import des middleware
const { initializeDatabase, logRequests, corsHeaders } = require('./middleware/database');
const sanitizeMiddleware = require('./middleware/sanitize');
const MigrationService = require('./services/migration');
const supabaseStorage = require('./services/supabaseStorage');

const app = express();
const PORT = process.env.PORT || 5001;

// Configuration de la base de données PostgreSQL (Supabase)
const pool = new Pool({
  connectionString: process.env.DATABASE_POOLER_URL || process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20, // Nombre maximum de connexions dans le pool
  idleTimeoutMillis: 30000, // Fermer les connexions inactives après 30 secondes
  connectionTimeoutMillis: 10000, // Timeout de connexion à 10 secondes
  keepAlive: true, // Garder les connexions actives
  keepAliveInitialDelayMillis: 10000 // Délai initial pour keepAlive
});

// Gérer les erreurs de pool
pool.on('error', (err, client) => {
  console.error('❌ Erreur inattendue sur le client PostgreSQL inactif', err);
});

// Tester la connexion au démarrage
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erreur connexion initiale PostgreSQL:', err);
  } else {
    console.log('✅ Connexion PostgreSQL établie:', res.rows[0].now);
  }
});

// Middleware globaux
app.use(corsHeaders);
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware pour gérer les erreurs de parsing JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('❌ Erreur parsing JSON:', err.message);
    return res.status(400).json({ 
      error: 'Format JSON invalide',
      details: err.message 
    });
  }
  next(err);
});
app.use(logRequests);

// Middleware de sanitisation (protection XSS et SQL Injection)
app.use(sanitizeMiddleware);

// Initialisation de la base de données (une seule fois)
app.use(initializeDatabase);

// Routes de base
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Exilae - Serveur Express fonctionne correctement!',
    version: '1.0.0',
    endpoints: {
      forms: '/api/forms',
      consultations: '/api/consultations',
      oqtf: '/api/oqtf',
      newsletter: '/api/newsletter',
      blog: '/api/blog',
      uploads: '/api/uploads',
      health: '/api/health',
      dbTest: '/api/db-test'
    }
  });
});

// Routes API modulaires
app.use('/api/forms', formsRoutes);
app.use('/api/consultations', consultationsRoutes);
app.use('/api/oqtf', oqtfRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/blog', blogRoutes);

// Configuration multer pour upload direct
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuration multer pour Supabase Storage (en mémoire)
const upload = multer({
  storage: multer.memoryStorage(), // Stockage en mémoire pour Supabase
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Type non autorisé: ${file.mimetype}`), false);
    }
  }
});

// Route d'upload avec VRAI upload vers Supabase
app.post('/api/uploads/single', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Aucun fichier' });
    }

    const userEmail = req.body.userEmail || 'anonymous';
    const timestamp = Date.now();
    // Sanitiser le nom de fichier pour Supabase Storage
    const sanitizedOriginalName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/_{2,}/g, '_');
    const fileName = `${timestamp}_${sanitizedOriginalName}`;
    const userFolder = userEmail.replace('@', '_at_').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filePath = `consultation-documents/${userFolder}/${fileName}`;
    
    console.log('✅ Fichier reçu:', req.file.originalname, `(${req.file.size} bytes)`);
    console.log('📤 Upload vers Supabase Storage...');
    
    // Import Supabase
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    
    // Upload vers Supabase Storage
    const { data, error } = await supabase.storage
      .from('admin-uploads')
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (error) {
      console.error('❌ Erreur Supabase:', error);
      throw new Error(`Erreur upload Supabase: ${error.message}`);
    }

    // Obtenir l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('admin-uploads')
      .getPublicUrl(filePath);
    
    console.log('✅ Fichier uploadé vers Supabase:', filePath);
    console.log('🔗 URL publique:', publicUrl);
    
    res.json({
      success: true,
      message: 'Fichier uploadé avec succès vers Supabase',
      data: {
        publicUrl: publicUrl,
        fileName: fileName,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        path: filePath
      }
    });
  } catch (error) {
    console.error('❌ Erreur upload:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/uploads/info', async (req, res) => {
  try {
    // Lister les buckets disponibles
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    res.json({
      success: true,
      message: 'Service d\'upload Supabase actif',
      data: {
        maxFileSize: '10MB',
        allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
        storage: 'supabase',
        buckets: buckets ? buckets.map(b => b.name) : [],
        error: error ? error.message : null
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      storage: 'fallback-local'
    });
  }
});

// Servir les fichiers uploadés statiquement
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Servir les fichiers statiques du build React (production)
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Exilae Backend API',
    database: {
      connected: pool.totalCount > 0 ? true : 'unknown',
      poolSize: pool.totalCount
    }
  });
});

// Test de connexion à la base de données
app.get('/api/db-test', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as postgres_version');
    client.release();
    
    res.json({
      message: 'Connexion à Supabase réussie!',
      data: result.rows[0],
      connection: 'OK'
    });
  } catch (err) {
    console.error('Erreur de connexion à la base de données:', err);
    res.status(500).json({
      error: 'Erreur de connexion à la base de données',
      details: err.message
    });
  }
});

// Exemple de route API
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API de test fonctionnelle',
    data: {
      server: 'Express.js',
      version: '1.0.0'
    }
  });
});

// Route catch-all pour React Router (SPA)
// Middleware qui sert index.html pour toutes les routes non-API et non-fichiers
app.use((req, res, next) => {
  // Ignorer les routes API
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  // Ignorer TOUS les fichiers avec extension (même dans des sous-dossiers)
  // Cela inclut /blog/assets/index.css, /assets/logo.png, etc.
  if (/\.[a-zA-Z0-9]+$/.test(req.path)) {
    return next();
  }
  // Servir index.html pour toutes les autres routes (SPA)
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'), (err) => {
    if (err) {
      next(err);
    }
  });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err.stack);
  res.status(500).json({
    error: 'Une erreur interne du serveur s\'est produite',
    message: err.message
  });
});

// Gestion des erreurs non capturées pour éviter les crashes
process.on('uncaughtException', (error) => {
  console.error('❌ Erreur non capturée:', error);
  console.log('⚠️ Le serveur continue de fonctionner...');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesse rejetée non gérée:', reason);
  console.log('⚠️ Le serveur continue de fonctionner...');
});

app.listen(PORT, async () => {
  console.log(`🚀 Serveur Exilae démarré sur http://localhost:${PORT}`);
  console.log(`📡 API REST disponible sur http://localhost:${PORT}/api`);
  console.log(`🗄️  Base de données: ${process.env.DATABASE_POOLER_URL ? 'Supabase Pooler' : 'Supabase Direct'}`);
  
  // Exécuter les migrations
  try {
    await MigrationService.addDocumentUrlColumns();
  } catch (error) {
    console.error('❌ Erreur lors des migrations:', error);
  }
  
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   • Formulaires: /api/forms/contact`);
  console.log(`   • Consultations: /api/consultations`);
  console.log(`   • OQTF Urgence: /api/oqtf`);
  console.log(`   • Newsletter: /api/newsletter`);
  console.log(`   • Blog: /api/blog`);
  console.log(`   • Uploads: /api/uploads`);
  console.log(`   • Health Check: /api/health`);
  console.log(`   • DB Test: /api/db-test`);
});
