import apiService from './apiService';

class OQTFService {
  // Créer une nouvelle demande OQTF urgente
  async createOQTFRequest(formData) {
    try {
      const response = await apiService.post('/oqtf', formData);
      
      return {
        success: true,
        message: 'Demande OQTF urgente créée avec succès !',
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la création de la demande OQTF',
        error: error.message
      };
    }
  }

  // Récupérer toutes les demandes OQTF
  async getAllOQTFRequests(page = 1, limit = 20) {
    try {
      const response = await apiService.get('/oqtf', { page, limit });
      
      return {
        success: true,
        data: response.data,
        count: response.count
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des demandes OQTF',
        error: error.message
      };
    }
  }

  // Récupérer les cas critiques (délai ≤ 7 jours)
  async getCriticalOQTFCases() {
    try {
      const response = await apiService.get('/oqtf/critical');
      
      return {
        success: true,
        data: response.data,
        count: response.count,
        message: response.message
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des cas critiques',
        error: error.message
      };
    }
  }

  // Récupérer les statistiques des délais
  async getOQTFStats() {
    try {
      const response = await apiService.get('/oqtf/stats');
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des statistiques',
        error: error.message
      };
    }
  }

  // Récupérer par type d'OQTF
  async getOQTFByType(type) {
    try {
      const response = await apiService.get(`/oqtf/type/${type}`);
      
      return {
        success: true,
        data: response.data,
        count: response.count,
        type: response.type
      };
    } catch (error) {
      return {
        success: false,
        message: `Erreur lors de la récupération des OQTF de type ${type}`,
        error: error.message
      };
    }
  }

  // Mettre à jour le statut d'une demande OQTF
  async updateOQTFStatus(id, statut) {
    try {
      const response = await apiService.put(`/oqtf/${id}/status`, { statut });
      
      return {
        success: true,
        message: 'Statut OQTF mis à jour avec succès',
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la mise à jour du statut',
        error: error.message
      };
    }
  }

  // Mettre à jour la priorité d'une demande OQTF
  async updateOQTFPriority(id, priorite) {
    try {
      const response = await apiService.put(`/oqtf/${id}/priority`, { priorite });
      
      return {
        success: true,
        message: 'Priorité OQTF mise à jour avec succès',
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la mise à jour de la priorité',
        error: error.message
      };
    }
  }

  // Valider les données OQTF
  validateOQTFForm(formData) {
    const errors = {};
    
    if (!formData.nom || formData.nom.trim().length < 2) {
      errors.nom = 'Le nom est obligatoire (minimum 2 caractères)';
    }
    
    if (!formData.prenom || formData.prenom.trim().length < 2) {
      errors.prenom = 'Le prénom est obligatoire (minimum 2 caractères)';
    }
    
    if (!formData.email || !this.isValidEmail(formData.email)) {
      errors.email = 'Un email valide est obligatoire';
    }
    
    if (!formData.telephone || !this.isValidPhone(formData.telephone)) {
      errors.telephone = 'Un numéro de téléphone valide est obligatoire';
    }
    
    if (!formData.numero_oqtf || formData.numero_oqtf.trim().length < 5) {
      errors.numero_oqtf = 'Le numéro OQTF est obligatoire';
    }
    
    if (!formData.date_reception_oqtf || !this.isValidDate(formData.date_reception_oqtf)) {
      errors.date_reception_oqtf = 'La date de réception de l\'OQTF est obligatoire';
    }
    
    if (!formData.delai_restant || formData.delai_restant < 0) {
      errors.delai_restant = 'Le délai restant doit être un nombre positif';
    }
    
    if (!formData.description_situation || formData.description_situation.trim().length < 50) {
      errors.description_situation = 'Une description détaillée de votre situation est obligatoire (minimum 50 caractères)';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Calculer le délai restant en jours
  calculateRemainingDays(dateReception, delaiTotal = 30) {
    const receptionDate = new Date(dateReception);
    const today = new Date();
    const diffTime = today.getTime() - receptionDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, delaiTotal - diffDays);
  }

  // Déterminer le niveau d'urgence
  getUrgencyLevel(delaiRestant) {
    if (delaiRestant <= 7) return { level: 'CRITIQUE', color: 'red', priority: 1 };
    if (delaiRestant <= 15) return { level: 'URGENT', color: 'orange', priority: 2 };
    if (delaiRestant <= 30) return { level: 'IMPORTANT', color: 'yellow', priority: 3 };
    return { level: 'NORMAL', color: 'green', priority: 4 };
  }

  // Valider l'email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Valider le téléphone
  isValidPhone(phone) {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone);
  }

  // Valider une date
  isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }

  // Formater les données avant envoi
  formatOQTFData(formData) {
    return {
      nom: formData.nom?.trim(),
      prenom: formData.prenom?.trim(),
      email: formData.email?.trim().toLowerCase(),
      telephone: formData.telephone?.trim(),
      date_naissance: formData.date_naissance || null,
      nationalite: formData.nationalite?.trim(),
      numero_oqtf: formData.numero_oqtf?.trim(),
      date_reception_oqtf: formData.date_reception_oqtf,
      type_oqtf: formData.type_oqtf?.trim(),
      delai_restant: parseInt(formData.delai_restant) || 0,
      prefecture: formData.prefecture?.trim(),
      situation_familiale: formData.situation_familiale?.trim(),
      enfants_scolarises: Boolean(formData.enfants_scolarises),
      emploi_actuel: formData.emploi_actuel?.trim(),
      duree_sejour_france: parseInt(formData.duree_sejour_france) || 0,
      documents_disponibles: formData.documents_disponibles || {},
      description_situation: formData.description_situation?.trim(),
      aide_juridictionnelle: Boolean(formData.aide_juridictionnelle),
      priorite: parseInt(formData.priorite) || 1
    };
  }

  // Obtenir les types d'OQTF
  getOQTFTypes() {
    return [
      { value: 'OQTF avec délai', label: 'OQTF avec délai de départ volontaire' },
      { value: 'OQTF sans délai', label: 'OQTF sans délai de départ volontaire' },
      { value: 'OQTF avec placement', label: 'OQTF avec placement en rétention' },
      { value: 'OQTF avec assignation', label: 'OQTF avec assignation à résidence' },
      { value: 'IRTF', label: 'IRTF - Interdiction de retour' }
    ];
  }

  // Obtenir les préfectures principales
  getPrefectures() {
    return [
      'Paris', 'Bobigny', 'Créteil', 'Nanterre',
      'Marseille', 'Nice', 'Lyon', 'Toulouse',
      'Lille', 'Strasbourg', 'Bordeaux', 'Nantes',
      'Montpellier', 'Rennes', 'Autre'
    ];
  }
}

// Instance singleton
const oqtfService = new OQTFService();

export default oqtfService;
