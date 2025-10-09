// Configuration de base pour l'API
const API_BASE_URL = 'http://localhost:5001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Méthode générique pour faire des requêtes
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Si on envoie des données, les convertir en JSON
    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      console.log(`🌐 API Request: ${config.method || 'GET'} ${url}`);
      
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Erreur HTTP: ${response.status}`);
      }

      console.log(`✅ API Response: ${config.method || 'GET'} ${url}`, data);
      return data;

    } catch (error) {
      console.error(`❌ API Error: ${config.method || 'GET'} ${url}`, error);
      throw error;
    }
  }

  // Méthodes HTTP spécifiques
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: data,
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data,
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // Méthode pour tester la connexion
  async testConnection() {
    try {
      const response = await this.get('/health');
      return {
        success: true,
        status: response.status,
        message: 'Connexion API réussie'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Échec de la connexion API'
      };
    }
  }

  // Méthode pour tester la base de données
  async testDatabase() {
    try {
      const response = await this.get('/db-test');
      return {
        success: true,
        data: response.data,
        message: 'Connexion base de données réussie'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Échec de la connexion base de données'
      };
    }
  }
}

// Instance singleton
const apiService = new ApiService();

export default apiService;
