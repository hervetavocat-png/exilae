import React, { useState, useEffect } from 'react';
import { testAllConnections } from '../services';

const ConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    api: null,
    database: null,
    allConnected: false,
    loading: true
  });

  const testConnections = async () => {
    setConnectionStatus(prev => ({ ...prev, loading: true }));
    
    try {
      const result = await testAllConnections();
      setConnectionStatus({
        ...result,
        loading: false
      });
    } catch (error) {
      setConnectionStatus({
        api: { success: false, error: error.message },
        database: { success: false, error: error.message },
        allConnected: false,
        loading: false
      });
    }
  };

  useEffect(() => {
    testConnections();
  }, []);

  const getStatusColor = (success) => {
    if (success === null) return 'bg-gray-100 text-gray-600';
    return success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getStatusIcon = (success) => {
    if (success === null) return '⏳';
    return success ? '✅' : '❌';
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          🔧 Test de Connexion API
        </h2>
        <button
          onClick={testConnections}
          disabled={connectionStatus.loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {connectionStatus.loading ? 'Test en cours...' : 'Retester'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Statut API */}
        <div className={`p-4 rounded-lg ${getStatusColor(connectionStatus.api?.success)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">
                {getStatusIcon(connectionStatus.api?.success)}
              </span>
              <div>
                <h3 className="font-semibold">Connexion API</h3>
                <p className="text-sm">
                  {connectionStatus.api?.success 
                    ? connectionStatus.api.message 
                    : connectionStatus.api?.error || 'En attente...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statut Base de données */}
        <div className={`p-4 rounded-lg ${getStatusColor(connectionStatus.database?.success)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">
                {getStatusIcon(connectionStatus.database?.success)}
              </span>
              <div>
                <h3 className="font-semibold">Base de Données (Supabase)</h3>
                <p className="text-sm">
                  {connectionStatus.database?.success 
                    ? connectionStatus.database.message 
                    : connectionStatus.database?.error || 'En attente...'}
                </p>
                {connectionStatus.database?.data && (
                  <p className="text-xs mt-1">
                    Version: {connectionStatus.database.data.postgres_version?.split(',')[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statut global */}
        <div className={`p-4 rounded-lg border-2 ${
          connectionStatus.allConnected 
            ? 'border-green-500 bg-green-50' 
            : 'border-red-500 bg-red-50'
        }`}>
          <div className="flex items-center">
            <span className="text-2xl mr-3">
              {connectionStatus.allConnected ? '🎉' : '⚠️'}
            </span>
            <div>
              <h3 className="font-semibold text-lg">
                {connectionStatus.allConnected 
                  ? 'Toutes les connexions sont opérationnelles !' 
                  : 'Certaines connexions ont échoué'}
              </h3>
              <p className="text-sm">
                {connectionStatus.allConnected 
                  ? 'Votre frontend est correctement connecté au backend et à la base de données.'
                  : 'Vérifiez que le serveur backend est démarré et que la configuration est correcte.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">📋 Instructions :</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Assurez-vous que le serveur backend est démarré : <code className="bg-blue-100 px-1 rounded">npm run dev</code></li>
          <li>• Vérifiez la variable d'environnement : <code className="bg-blue-100 px-1 rounded">REACT_APP_API_URL</code></li>
          <li>• Le serveur backend doit être accessible sur : <code className="bg-blue-100 px-1 rounded">http://localhost:5001</code></li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectionTest;
