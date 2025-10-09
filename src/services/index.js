// Export centralisé de tous les services API
export { default as apiService } from './apiService';
export { default as contactFormService } from './contactFormService';
export { default as consultationService } from './consultationService';
export { default as oqtfService } from './oqtfService';
export { default as newsletterService } from './newsletterService';
export { default as uploadService } from './uploadService';

// Import des services pour l'export groupé
import apiService from './apiService';
import contactFormService from './contactFormService';
import consultationService from './consultationService';
import oqtfService from './oqtfService';
import newsletterService from './newsletterService';
import uploadService from './uploadService';

// Export groupé pour faciliter l'importation
export const services = {
  api: apiService,
  contactForm: contactFormService,
  consultation: consultationService,
  oqtf: oqtfService,
  newsletter: newsletterService,
  upload: uploadService
};

// Fonction utilitaire pour tester toutes les connexions
export const testAllConnections = async () => {
  const { default: apiService } = await import('./apiService');
  
  console.log('🔍 Test des connexions API...');
  
  const apiTest = await apiService.testConnection();
  const dbTest = await apiService.testDatabase();
  
  return {
    api: apiTest,
    database: dbTest,
    allConnected: apiTest.success && dbTest.success
  };
};

// Configuration globale
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5001/api',
  TIMEOUT: 10000, // 10 secondes
  RETRY_ATTEMPTS: 3
};

export default services;
