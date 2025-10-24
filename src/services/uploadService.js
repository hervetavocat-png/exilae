import apiService from './apiService';

class UploadService {
  constructor() {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    this.baseURL = `${apiUrl}/uploads`;
  }

  /**
   * Upload d'un seul fichier
   * @param {File} file - Fichier à uploader
   * @param {string} folder - Dossier de destination (optionnel)
   * @param {function} onProgress - Callback pour le suivi du progrès (optionnel)
   * @returns {Promise<Object>} Résultat de l'upload
   */
  async uploadSingleFile(file, folder = 'documents', onProgress = null) {
    try {
      if (!file) {
        throw new Error('Aucun fichier fourni');
      }

      // Validation du type de fichier
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error(`Type de fichier non autorisé: ${file.type}. Types autorisés: ${allowedTypes.join(', ')}`);
      }

      // Validation de la taille (10MB max)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new Error('Fichier trop volumineux (max 10MB)');
      }

      // Création du FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      console.log(`📤 Upload du fichier: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);

      // Configuration pour l'upload avec suivi du progrès
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };

      if (onProgress && typeof onProgress === 'function') {
        config.onUploadProgress = (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        };
      }

      // Envoi de la requête
      const response = await fetch(`${this.baseURL}/single`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'upload');
      }

      console.log('✅ Fichier uploadé avec succès:', result.data);
      return result;

    } catch (error) {
      console.error('❌ Erreur lors de l\'upload:', error);
      throw error;
    }
  }

  /**
   * Upload de plusieurs fichiers
   * @param {FileList|Array} files - Fichiers à uploader
   * @param {string} folder - Dossier de destination (optionnel)
   * @param {function} onProgress - Callback pour le suivi du progrès (optionnel)
   * @returns {Promise<Object>} Résultat de l'upload
   */
  async uploadMultipleFiles(files, folder = 'documents', onProgress = null) {
    try {
      if (!files || files.length === 0) {
        throw new Error('Aucun fichier fourni');
      }

      // Conversion en array si nécessaire
      const fileArray = Array.from(files);

      // Validation du nombre de fichiers (max 5)
      if (fileArray.length > 5) {
        throw new Error('Trop de fichiers (max 5 fichiers)');
      }

      // Validation de chaque fichier
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
      ];

      const maxSize = 10 * 1024 * 1024; // 10MB

      for (const file of fileArray) {
        if (!allowedTypes.includes(file.type)) {
          throw new Error(`Type de fichier non autorisé: ${file.type} (${file.name})`);
        }
        if (file.size > maxSize) {
          throw new Error(`Fichier trop volumineux: ${file.name} (max 10MB)`);
        }
      }

      // Création du FormData
      const formData = new FormData();
      fileArray.forEach(file => {
        formData.append('files', file);
      });
      formData.append('folder', folder);

      console.log(`📤 Upload de ${fileArray.length} fichiers`);

      // Configuration pour l'upload
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };

      if (onProgress && typeof onProgress === 'function') {
        config.onUploadProgress = (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        };
      }

      // Envoi de la requête
      const response = await fetch(`${this.baseURL}/multiple`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok && response.status !== 207) { // 207 = Multi-Status
        throw new Error(result.error || 'Erreur lors de l\'upload');
      }

      console.log('✅ Upload terminé:', result);
      return result;

    } catch (error) {
      console.error('❌ Erreur lors de l\'upload multiple:', error);
      throw error;
    }
  }

  /**
   * Supprime un fichier
   * @param {string} filePath - Chemin du fichier à supprimer
   * @returns {Promise<Object>} Résultat de la suppression
   */
  async deleteFile(filePath) {
    try {
      if (!filePath) {
        throw new Error('Chemin du fichier manquant');
      }

      console.log(`🗑️ Suppression du fichier: ${filePath}`);

      const response = await fetch(`${this.baseURL}/${encodeURIComponent(filePath)}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la suppression');
      }

      console.log('✅ Fichier supprimé avec succès');
      return result;

    } catch (error) {
      console.error('❌ Erreur lors de la suppression:', error);
      throw error;
    }
  }

  /**
   * Liste les fichiers dans un dossier
   * @param {string} folder - Dossier à lister (optionnel)
   * @returns {Promise<Object>} Liste des fichiers
   */
  async listFiles(folder = '') {
    try {
      console.log(`📋 Liste des fichiers dans: ${folder || 'racine'}`);

      const url = folder ? `${this.baseURL}/list?folder=${encodeURIComponent(folder)}` : `${this.baseURL}/list`;
      
      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la récupération de la liste');
      }

      console.log('✅ Liste récupérée avec succès');
      return result;

    } catch (error) {
      console.error('❌ Erreur lors de la liste des fichiers:', error);
      throw error;
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
      if (!filePath) {
        throw new Error('Chemin du fichier manquant');
      }

      console.log(`🔗 Génération d'URL signée pour: ${filePath}`);

      const url = `${this.baseURL}/signed-url/${encodeURIComponent(filePath)}?expiresIn=${expiresIn}`;
      
      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la génération de l\'URL');
      }

      console.log('✅ URL signée générée avec succès');
      return result;

    } catch (error) {
      console.error('❌ Erreur lors de la génération de l\'URL signée:', error);
      throw error;
    }
  }

  /**
   * Récupère les informations sur le service d'upload
   * @returns {Promise<Object>} Informations du service
   */
  async getUploadInfo() {
    try {
      const response = await fetch(`${this.baseURL}/info`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la récupération des informations');
      }

      return result;

    } catch (error) {
      console.error('❌ Erreur lors de la récupération des informations:', error);
      throw error;
    }
  }

  /**
   * Validation côté client d'un fichier
   * @param {File} file - Fichier à valider
   * @returns {Object} Résultat de la validation
   */
  validateFile(file) {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    ];

    const maxSize = 10 * 1024 * 1024; // 10MB

    const validation = {
      isValid: true,
      errors: []
    };

    if (!file) {
      validation.isValid = false;
      validation.errors.push('Aucun fichier fourni');
      return validation;
    }

    if (!allowedTypes.includes(file.type)) {
      validation.isValid = false;
      validation.errors.push(`Type de fichier non autorisé: ${file.type}`);
    }

    if (file.size > maxSize) {
      validation.isValid = false;
      validation.errors.push(`Fichier trop volumineux: ${(file.size / 1024 / 1024).toFixed(2)}MB (max 10MB)`);
    }

    return validation;
  }

  /**
   * Formate la taille d'un fichier pour l'affichage
   * @param {number} bytes - Taille en bytes
   * @returns {string} Taille formatée
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export default new UploadService();
