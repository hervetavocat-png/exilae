import React, { useState } from 'react';
import { uploadService } from '../services';

const FileUploadExample = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState([]);
  const [error, setError] = useState('');
  const [fileList, setFileList] = useState([]);
  const [folder, setFolder] = useState('documents');

  // Gestion de la sélection de fichiers
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setError('');
    
    // Validation côté client
    files.forEach(file => {
      const validation = uploadService.validateFile(file);
      if (!validation.isValid) {
        setError(`${file.name}: ${validation.errors.join(', ')}`);
      }
    });
  };

  // Upload d'un seul fichier
  const handleSingleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    setIsUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      const result = await uploadService.uploadSingleFile(
        selectedFiles[0],
        folder,
        (progress) => setUploadProgress(progress)
      );

      setUploadResults([result.data]);
      setSelectedFiles([]);
      document.getElementById('fileInput').value = '';
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Upload de plusieurs fichiers
  const handleMultipleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Veuillez sélectionner des fichiers');
      return;
    }

    setIsUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      const result = await uploadService.uploadMultipleFiles(
        selectedFiles,
        folder,
        (progress) => setUploadProgress(progress)
      );

      if (result.success) {
        setUploadResults(Array.isArray(result.data) ? result.data : [result.data]);
      } else {
        // Gestion des uploads partiellement réussis
        const successful = result.data?.successful || [];
        const failed = result.data?.failed || [];
        
        setUploadResults(successful);
        if (failed.length > 0) {
          setError(`Certains fichiers n'ont pas pu être uploadés: ${failed.map(f => f.fileName).join(', ')}`);
        }
      }

      setSelectedFiles([]);
      document.getElementById('fileInput').value = '';
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Liste des fichiers
  const handleListFiles = async () => {
    try {
      const result = await uploadService.listFiles(folder);
      setFileList(result.data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  // Suppression d'un fichier
  const handleDeleteFile = async (filePath) => {
    try {
      await uploadService.deleteFile(filePath);
      setUploadResults(prev => prev.filter(file => file.path !== filePath));
      handleListFiles(); // Rafraîchir la liste
    } catch (error) {
      setError(error.message);
    }
  };

  // Génération d'URL signée
  const handleGetSignedUrl = async (filePath) => {
    try {
      const result = await uploadService.getSignedUrl(filePath, 3600); // 1 heure
      window.open(result.data.signedUrl, '_blank');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Test Upload de Fichiers</h2>

      {/* Configuration */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dossier de destination:
        </label>
        <input
          type="text"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="documents"
        />
      </div>

      {/* Sélection de fichiers */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sélectionner des fichiers:
        </label>
        <input
          id="fileInput"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          onChange={handleFileSelect}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Types autorisés: PDF, JPG, PNG, WebP (max 10MB par fichier, max 5 fichiers)
        </p>
      </div>

      {/* Fichiers sélectionnés */}
      {selectedFiles.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Fichiers sélectionnés:</h3>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{file.name}</span>
                <span className="text-sm text-gray-500">
                  {uploadService.formatFileSize(file.size)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Boutons d'action */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleSingleUpload}
          disabled={isUploading || selectedFiles.length !== 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Upload 1 fichier
        </button>
        
        <button
          onClick={handleMultipleUpload}
          disabled={isUploading || selectedFiles.length === 0}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Upload plusieurs fichiers
        </button>

        <button
          onClick={handleListFiles}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Lister les fichiers
        </button>
      </div>

      {/* Barre de progression */}
      {isUploading && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Upload en cours...</span>
            <span className="text-sm text-gray-500">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Messages d'erreur */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Résultats d'upload */}
      {uploadResults.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-green-700">Fichiers uploadés avec succès:</h3>
          <div className="space-y-3">
            {uploadResults.map((file, index) => (
              <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{file.originalName}</p>
                    <p className="text-sm text-gray-600">Nom unique: {file.fileName}</p>
                    <p className="text-sm text-gray-600">Chemin: {file.path}</p>
                    <p className="text-sm text-gray-600">
                      Taille: {uploadService.formatFileSize(file.size)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Uploadé le: {new Date(file.uploadedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleGetSignedUrl(file.path)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() => handleDeleteFile(file.path)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Liste des fichiers du serveur */}
      {fileList.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Fichiers sur le serveur ({folder || 'racine'}):</h3>
          <div className="space-y-2">
            {fileList.map((file, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-600">
                    Taille: {uploadService.formatFileSize(file.metadata?.size || 0)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Modifié: {new Date(file.updated_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleGetSignedUrl(`${folder}/${file.name}`)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Voir
                  </button>
                  <button
                    onClick={() => handleDeleteFile(`${folder}/${file.name}`)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadExample;
