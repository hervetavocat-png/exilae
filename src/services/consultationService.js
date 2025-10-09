import apiService from './apiService';

class ConsultationService {
  // Créer une nouvelle demande de consultation
  async createConsultationRequest(formData) {
    try {
      const response = await apiService.post('/consultations', formData);
      
      return {
        success: true,
        message: 'Demande de consultation créée avec succès !',
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la création de la demande',
        error: error.message
      };
    }
  }

  // Récupérer toutes les demandes de consultation
  async getAllConsultations(page = 1, limit = 20, statut = null) {
    try {
      const params = { page, limit };
      if (statut) params.statut = statut;
      
      const response = await apiService.get('/consultations', params);
      
      return {
        success: true,
        data: response.data,
        count: response.count
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des consultations',
        error: error.message
      };
    }
  }

  // Récupérer les demandes urgentes
  async getUrgentConsultations() {
    try {
      const response = await apiService.get('/consultations/urgent');
      
      return {
        success: true,
        data: response.data,
        count: response.count
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des consultations urgentes',
        error: error.message
      };
    }
  }

  // Récupérer une consultation par ID
  async getConsultationById(id) {
    try {
      const response = await apiService.get(`/consultations/${id}`);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Consultation non trouvée',
        error: error.message
      };
    }
  }

  // Mettre à jour le statut d'une consultation
  async updateConsultationStatus(id, statut) {
    try {
      const response = await apiService.put(`/consultations/${id}/status`, { statut });
      
      return {
        success: true,
        message: 'Statut mis à jour avec succès',
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

  // Valider les données de consultation
  validateConsultationForm(formData) {
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
    
    if (!formData.situation_actuelle || formData.situation_actuelle.trim().length < 20) {
      errors.situation_actuelle = 'La description de votre situation est obligatoire (minimum 20 caractères)';
    }
    
    if (formData.date_naissance && !this.isValidDate(formData.date_naissance)) {
      errors.date_naissance = 'Format de date invalide';
    }
    
    if (formData.date_souhaitee && !this.isValidFutureDate(formData.date_souhaitee)) {
      errors.date_souhaitee = 'La date souhaitée doit être dans le futur';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
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

  // Valider une date future
  isValidFutureDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }

  // Formater les données avant envoi
  formatConsultationData(formData) {
    return {
      nom: formData.nom?.trim(),
      prenom: formData.prenom?.trim(),
      email: formData.email?.trim().toLowerCase(),
      telephone: formData.telephone?.trim(),
      date_naissance: formData.date_naissance || null,
      nationalite: formData.nationalite?.trim(),
      situation_actuelle: formData.situation_actuelle?.trim(),
      type_procedure: formData.type_procedure?.trim(),
      urgence_niveau: formData.urgence_niveau || 'normal',
      ville_consultation: formData.ville_consultation?.trim(),
      date_souhaitee: formData.date_souhaitee || null,
      heure_souhaitee: formData.heure_souhaitee || null,
      message_complementaire: formData.message_complementaire?.trim(),
      document_url: formData.document_url || null,
      documents_fournis: formData.documents_fournis || {}
    };
  }

  // Formater les données avant envoi (version étendue avec document_url)
  formatConsultationDataWithUpload(formData) {
    return {
      nom: formData.nom?.trim(),
      prenom: formData.prenom?.trim(),
      email: formData.email?.trim().toLowerCase(),
      telephone: formData.telephone?.trim(),
      date_naissance: formData.date_naissance || null,
      nationalite: formData.nationalite?.trim(),
      situation_actuelle: formData.situation_actuelle?.trim(),
      type_procedure: formData.type_procedure?.trim(),
      urgence_niveau: formData.urgence_niveau || 'normal',
      ville_consultation: formData.ville_consultation?.trim(),
      date_souhaitee: formData.date_souhaitee || null,
      heure_souhaitee: formData.heure_souhaitee || null,
      message_complementaire: formData.message_complementaire?.trim(),
      document_url: formData.document_url || null,
      documents_fournis: formData.documents_fournis || {}
    };
  }

  // Obtenir les options pour les select
  getUrgenceLevels() {
    return [
      { value: 'normal', label: 'Normal' },
      { value: 'important', label: 'Important' },
      { value: 'urgent', label: 'Urgent' }
    ];
  }

  getConsultationTypes() {
    return [
      { value: 'OQTF', label: 'OQTF - Obligation de Quitter le Territoire' },
      { value: 'Naturalisation', label: 'Naturalisation française' },
      { value: 'Regroupement familial', label: 'Regroupement familial' },
      { value: 'Titre de séjour', label: 'Titre de séjour' },
      { value: 'Asile', label: 'Demande d\'asile' },
      { value: 'Autre', label: 'Autre procédure' }
    ];
  }

  getConsultationCities() {
    return [
      { value: 'Paris', label: 'Paris' },
      { value: 'Nice', label: 'Nice' },
      { value: 'Lyon', label: 'Lyon' },
      { value: 'Marseille', label: 'Marseille' },
      { value: 'Toulouse', label: 'Toulouse' },
      { value: 'Visioconférence', label: 'Visioconférence' }
    ];
  }
}

// Instance singleton
const consultationService = new ConsultationService();

export default consultationService;
