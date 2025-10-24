import React, { useState } from 'react';

const AdminUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Veuillez sélectionner un fichier');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('folder', 'documents');

      const response = await fetch('https://exilae.onrender.com/api/uploads/single', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setMessage(`✅ Fichier uploadé avec succès: ${result.data.originalName}`);
        setUploadedFiles(prev => [...prev, result.data]);
        setSelectedFile(null);
        document.getElementById('fileInput').value = '';
      } else {
        setMessage(`❌ Erreur: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleListFiles = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/uploads/list');
      const result = await response.json();

      if (result.success) {
        setUploadedFiles(result.data || []);
        setMessage(`📋 ${result.data?.length || 0} fichiers trouvés`);
      } else {
        setMessage(`❌ Erreur: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
    }
  };

  const getSignedUrl = async (fileName) => {
    try {
      const response = await fetch(`http://localhost:5001/api/uploads/signed-url/${fileName}`);
      const result = await response.json();

      if (result.success) {
        window.open(result.data.signedUrl, '_blank');
      } else {
        setMessage(`❌ Erreur: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🔧 Test Upload Admin</h2>

      {/* Sélection de fichier */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sélectionner un fichier :
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          onChange={handleFileSelect}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Types autorisés: PDF, JPG, PNG, WebP (max 10MB)
        </p>
      </div>

      {/* Fichier sélectionné */}
      {selectedFile && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm">
            <strong>Fichier sélectionné:</strong> {selectedFile.name}
          </p>
          <p className="text-xs text-gray-600">
            Taille: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      {/* Boutons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {uploading ? '⏳ Upload...' : '📤 Upload'}
        </button>

        <button
          onClick={handleListFiles}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          📋 Lister les fichiers
        </button>
      </div>

      {/* Messages */}
      {message && (
        <div className={`mb-6 p-4 rounded-md ${
          message.includes('❌') ? 'bg-red-50 text-red-700' : 
          message.includes('✅') ? 'bg-green-50 text-green-700' : 
          'bg-blue-50 text-blue-700'
        }`}>
          <p>{message}</p>
        </div>
      )}

      {/* Liste des fichiers */}
      {uploadedFiles.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">📁 Fichiers uploadés:</h3>
          <div className="space-y-3">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">{file.name || file.originalName}</p>
                  {file.updated_at && (
                    <p className="text-sm text-gray-600">
                      {new Date(file.updated_at).toLocaleString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => getSignedUrl(file.name || file.fileName)}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  👁️ Voir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-md">
        <h4 className="font-semibold text-yellow-800 mb-2">📝 Instructions:</h4>
        <ol className="text-sm text-yellow-700 space-y-1">
          <li>1. Sélectionnez un fichier (image ou PDF)</li>
          <li>2. Cliquez sur "Upload" pour l'envoyer</li>
          <li>3. Le bucket "admin-uploads" sera créé automatiquement</li>
          <li>4. Allez sur Supabase Dashboard → Storage pour voir vos fichiers</li>
        </ol>
      </div>
    </div>
  );
};

export default AdminUpload;

