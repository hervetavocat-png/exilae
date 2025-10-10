const db = require('../services/database');

// Middleware pour initialiser les tables au démarrage
const initializeDatabase = async (req, res, next) => {
  try {
    // Cette fonction sera appelée une seule fois au démarrage
    if (!global.databaseInitialized) {
      console.log('🔧 Initialisation de la base de données...');
      await db.initializeTables();
      global.databaseInitialized = true;
      console.log('✅ Base de données initialisée avec succès');
    }
    next();
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
    // On continue même en cas d'erreur pour ne pas bloquer le serveur
    next();
  }
};

// Middleware pour logger les requêtes API
const logRequests = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  
  console.log(`📝 [${timestamp}] ${method} ${url} - IP: ${ip}`);
  next();
};

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Erreur de validation',
      details: error.message
    });
  }
  next(error);
};

// Middleware pour les réponses CORS personnalisées
const corsHeaders = (req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://lemonchiffon-cattle-465017.hostingersite.com',
    process.env.FRONTEND_URL
  ].filter(Boolean);
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = {
  initializeDatabase,
  logRequests,
  handleValidationErrors,
  corsHeaders
};
