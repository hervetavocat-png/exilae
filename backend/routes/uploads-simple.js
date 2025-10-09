const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuration de multer pour sauvegarder localement
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = req.body.folder || 'documents';
    const folderPath = path.join(uploadsDir, folder);
    
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    // Nom unique avec timestamp
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${timestamp}_${name}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Type de fichier non autorisé: ${file.mimetype}`), false);
    }
  }
});

/**
 * POST /api/uploads/single
 * Upload d'un seul fichier
 */
router.post('/single', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Aucun fichier fourni'
      });
    }

    console.log(`📤 Fichier uploadé: ${req.file.originalname}`);

    // URL publique du fichier (accessible via le serveur)
    const publicUrl = `http://localhost:5000/uploads/${req.body.folder || 'documents'}/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Fichier uploadé avec succès',
      data: {
        path: req.file.path,
        publicUrl: publicUrl,
        fileName: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        uploadedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Erreur lors de l\'upload:', error);
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'Fichier trop volumineux (max 10MB)'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'upload du fichier',
      details: error.message
    });
  }
});

/**
 * GET /api/uploads/info
 * Informations sur le service d'upload
 */
router.get('/info', (req, res) => {
  res.json({
    success: true,
    message: 'Service d\'upload local actif',
    data: {
      maxFileSize: '10MB',
      allowedMimeTypes: [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
      ],
      storage: 'local',
      uploadPath: '/uploads/',
      endpoints: {
        single: 'POST /api/uploads/single',
        info: 'GET /api/uploads/info'
      }
    }
  });
});

/**
 * GET /uploads/:folder/:filename
 * Servir les fichiers uploadés
 */
router.get('/:folder/:filename', (req, res) => {
  const { folder, filename } = req.params;
  const filePath = path.join(uploadsDir, folder, filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({
      success: false,
      error: 'Fichier non trouvé'
    });
  }
});

module.exports = router;
