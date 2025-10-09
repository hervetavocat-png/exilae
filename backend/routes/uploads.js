const express = require('express');
const multer = require('multer');
const supabaseStorage = require('../services/supabaseStorage');

const router = express.Router();

// Configuration de multer pour gérer les uploads en mémoire
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
  fileFilter: (req, file, cb) => {
    // Types MIME autorisés
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
      cb(new Error(`Type de fichier non autorisé: ${file.mimetype}. Types autorisés: ${allowedMimeTypes.join(', ')}`), false);
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

    console.log(`📤 Réception du fichier: ${req.file.originalname} (${req.file.size} bytes)`);

    // Dossier de destination (optionnel)
    const folder = req.body.folder || 'documents';

    // Upload vers Supabase Storage
    const result = await supabaseStorage.uploadFile(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype,
      folder
    );

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de l\'upload du fichier',
        details: result.error
      });
    }

    // Réponse avec les informations du fichier uploadé
    res.json({
      success: true,
      message: 'Fichier uploadé avec succès',
      data: result.data
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
 * POST /api/uploads/multiple
 * Upload de plusieurs fichiers
 */
router.post('/multiple', upload.array('files', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Aucun fichier fourni'
      });
    }

    console.log(`📤 Réception de ${req.files.length} fichiers`);

    const folder = req.body.folder || 'documents';
    const uploadResults = [];

    // Upload de chaque fichier
    for (const file of req.files) {
      console.log(`📤 Upload de: ${file.originalname}`);
      
      const result = await supabaseStorage.uploadFile(
        file.buffer,
        file.originalname,
        file.mimetype,
        folder
      );

      uploadResults.push({
        originalName: file.originalname,
        result: result
      });
    }

    // Vérifier si tous les uploads ont réussi
    const failedUploads = uploadResults.filter(r => !r.result.success);
    const successfulUploads = uploadResults.filter(r => r.result.success);

    if (failedUploads.length > 0) {
      return res.status(207).json({ // 207 Multi-Status
        success: false,
        message: `${successfulUploads.length}/${uploadResults.length} fichiers uploadés avec succès`,
        data: {
          successful: successfulUploads.map(r => r.result.data),
          failed: failedUploads.map(r => ({
            fileName: r.originalName,
            error: r.result.error
          }))
        }
      });
    }

    res.json({
      success: true,
      message: `${successfulUploads.length} fichiers uploadés avec succès`,
      data: successfulUploads.map(r => r.result.data)
    });

  } catch (error) {
    console.error('❌ Erreur lors de l\'upload multiple:', error);
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'Un ou plusieurs fichiers sont trop volumineux (max 10MB par fichier)'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'upload des fichiers',
      details: error.message
    });
  }
});

/**
 * DELETE /api/uploads/delete/:fileName
 * Suppression d'un fichier
 */
router.delete('/delete/:fileName', async (req, res) => {
  try {
    const fileName = req.params.fileName;

    if (!fileName) {
      return res.status(400).json({
        success: false,
        error: 'Nom du fichier manquant'
      });
    }

    console.log(`🗑️ Suppression du fichier: ${fileName}`);

    const result = await supabaseStorage.deleteFile(fileName);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la suppression du fichier',
        details: result.error
      });
    }

    res.json({
      success: true,
      message: 'Fichier supprimé avec succès'
    });

  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la suppression du fichier',
      details: error.message
    });
  }
});

/**
 * GET /api/uploads/list
 * Liste des fichiers dans un dossier
 */
router.get('/list', async (req, res) => {
  try {
    const folder = req.query.folder || '';

    console.log(`📋 Liste des fichiers dans: ${folder || 'racine'}`);

    const result = await supabaseStorage.listFiles(folder);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération de la liste des fichiers',
        details: result.error
      });
    }

    res.json({
      success: true,
      data: result.data,
      folder: folder || 'racine'
    });

  } catch (error) {
    console.error('❌ Erreur lors de la liste des fichiers:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération de la liste des fichiers',
      details: error.message
    });
  }
});

/**
 * GET /api/uploads/signed-url/:fileName
 * Génération d'une URL signée pour accéder à un fichier privé
 */
router.get('/signed-url/:fileName', async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const expiresIn = parseInt(req.query.expiresIn) || 3600; // 1 heure par défaut

    if (!fileName) {
      return res.status(400).json({
        success: false,
        error: 'Nom du fichier manquant'
      });
    }

    console.log(`🔗 Génération d'URL signée pour: ${fileName}`);

    const result = await supabaseStorage.getSignedUrl(fileName, expiresIn);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la génération de l\'URL signée',
        details: result.error
      });
    }

    res.json({
      success: true,
      data: result.data
    });

  } catch (error) {
    console.error('❌ Erreur lors de la génération de l\'URL signée:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la génération de l\'URL signée',
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
    data: {
      maxFileSize: '10MB',
      maxFiles: 5,
      allowedMimeTypes: [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
      ],
      bucketName: 'admin-uploads',
      endpoints: {
        single: 'POST /api/uploads/single',
        multiple: 'POST /api/uploads/multiple',
        delete: 'DELETE /api/uploads/delete/:fileName',
        list: 'GET /api/uploads/list',
        signedUrl: 'GET /api/uploads/signed-url/:fileName'
      }
    }
  });
});

module.exports = router;
