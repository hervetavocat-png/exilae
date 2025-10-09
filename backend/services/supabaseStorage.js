const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuration du client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  console.error('Assurez-vous d\'avoir SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans votre .env');
  console.log('⚠️ Service d\'upload désactivé temporairement');
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log('✅ Client Supabase Storage initialisé');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation du client Supabase:', error.message);
  }
}

class SupabaseStorageService {
  constructor() {
    this.bucketName = 'admin-uploads'; // Nom exact du bucket existant
  }

  /**
   * Vérifie si le bucket existe, le crée si nécessaire
   */
  async ensureBucketExists() {
    if (!supabase) {
      throw new Error('Service Supabase Storage non disponible - variables d\'environnement manquantes');
    }
    
    try {
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.error('❌ Erreur lors de la vérification des buckets:', listError);
        return false;
      }

      const bucketExists = buckets.some(bucket => bucket.name === this.bucketName);
      
      if (!bucketExists) {
        console.log(`🪣 Création du bucket '${this.bucketName}'...`);
        const { data, error } = await supabase.storage.createBucket(this.bucketName, {
          public: true, // Public pour pouvoir voir les images directement
          allowedMimeTypes: [
            'application/pdf',
            'image/jpeg',
            'image/jpg', 
            'image/png',
            'image/webp'
          ]
        });

        if (error) {
          console.error('❌ Erreur lors de la création du bucket:', error);
          return false;
        }

        console.log('✅ Bucket créé avec succès');
      }

      return true;
    } catch (error) {
      console.error('❌ Erreur lors de la gestion du bucket:', error);
      return false;
    }
  }

  /**
   * Upload un fichier vers Supabase Storage
   * @param {Buffer} fileBuffer - Buffer du fichier
   * @param {string} fileName - Nom du fichier
   * @param {string} mimeType - Type MIME du fichier
   * @param {string} folder - Dossier de destination (optionnel)
   * @returns {Promise<Object>} Résultat de l'upload
   */
  async uploadFile(fileBuffer, fileName, mimeType, folder = '') {
    try {
      // Vérifier que le bucket existe
      const bucketReady = await this.ensureBucketExists();
      if (!bucketReady) {
        throw new Error('Impossible de préparer le bucket de stockage');
      }

      // Générer un nom de fichier unique
      const timestamp = Date.now();
      const uniqueFileName = `${timestamp}_${fileName}`;
      const filePath = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;

      console.log(`📤 Upload du fichier: ${filePath}`);

      // Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .upload(filePath, fileBuffer, {
          contentType: mimeType,
          upsert: false
        });

      if (error) {
        console.error('❌ Erreur lors de l\'upload:', error);
        throw error;
      }

      // Générer l'URL publique (même si le bucket est privé, on peut générer l'URL)
      const { data: urlData } = supabase.storage
        .from(this.bucketName)
        .getPublicUrl(filePath);

      console.log('✅ Fichier uploadé avec succès');

      return {
        success: true,
        data: {
          path: data.path,
          fullPath: data.fullPath,
          publicUrl: urlData.publicUrl,
          fileName: uniqueFileName,
          originalName: fileName,
          size: fileBuffer.length,
          mimeType: mimeType,
          uploadedAt: new Date().toISOString()
        }
      };

    } catch (error) {
      console.error('❌ Erreur lors de l\'upload du fichier:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Supprime un fichier du storage
   * @param {string} filePath - Chemin du fichier à supprimer
   * @returns {Promise<Object>} Résultat de la suppression
   */
  async deleteFile(filePath) {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .remove([filePath]);

      if (error) {
        console.error('❌ Erreur lors de la suppression:', error);
        throw error;
      }

      console.log('✅ Fichier supprimé avec succès');
      return {
        success: true,
        data: data
      };

    } catch (error) {
      console.error('❌ Erreur lors de la suppression du fichier:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Liste les fichiers dans un dossier
   * @param {string} folder - Dossier à lister (optionnel)
   * @returns {Promise<Object>} Liste des fichiers
   */
  async listFiles(folder = '') {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .list(folder);

      if (error) {
        console.error('❌ Erreur lors de la liste des fichiers:', error);
        throw error;
      }

      return {
        success: true,
        data: data
      };

    } catch (error) {
      console.error('❌ Erreur lors de la liste des fichiers:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Génère une URL signée pour accéder à un fichier privé
   * @param {string} filePath - Chemin du fichier
   * @param {number} expiresIn - Durée de validité en secondes (défaut: 1 heure)
   * @returns {Promise<Object>} URL signée
   */
  async getSignedUrl(filePath, expiresIn = 3600) {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .createSignedUrl(filePath, expiresIn);

      if (error) {
        console.error('❌ Erreur lors de la génération de l\'URL signée:', error);
        throw error;
      }

      return {
        success: true,
        data: {
          signedUrl: data.signedUrl,
          expiresAt: new Date(Date.now() + (expiresIn * 1000)).toISOString()
        }
      };

    } catch (error) {
      console.error('❌ Erreur lors de la génération de l\'URL signée:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new SupabaseStorageService();
