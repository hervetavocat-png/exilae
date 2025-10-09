import apiService from './apiService';

class ContactFormService {
  // Envoyer un formulaire de contact
  async submitContactForm(formData) {
    try {
      const response = await apiService.post('/forms/contact', formData);
      
      return {
        success: true,
        message: 'Formulaire de contact envoyé avec succès !',
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de l\'envoi du formulaire',
        error: error.message
      };
    }
  }

  // Récupérer tous les formulaires (admin)
  async getAllContactForms(page = 1, limit = 20) {
    try {
      const response = await apiService.get('/forms/contact', { page, limit });
      
      return {
        success: true,
        data: response.data,
        pagination: response.pagination
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des formulaires',
        error: error.message
      };
    }
  }

  // Récupérer un formulaire par ID
  async getContactFormById(id) {
    try {
      const response = await apiService.get(`/forms/contact/${id}`);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Formulaire non trouvé',
        error: error.message
      };
    }
  }

  // Récupérer les formulaires par email
  async getContactFormsByEmail(email) {
    try {
      const response = await apiService.get(`/forms/contact/by-email/${email}`);
      
      return {
        success: true,
        data: response.data,
        count: response.count
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la recherche par email',
        error: error.message
      };
    }
  }

  // Valider les données du formulaire côté client
  validateContactForm(formData) {
    const errors = {};
    
    if (!formData.nom || formData.nom.trim().length < 2) {
      errors.nom = 'Le nom est obligatoire (minimum 2 caractères)';
    }
    
    if (!formData.email || !this.isValidEmail(formData.email)) {
      errors.email = 'Un email valide est obligatoire';
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = 'Le message est obligatoire (minimum 10 caractères)';
    }
    
    if (formData.telephone && !this.isValidPhone(formData.telephone)) {
      errors.telephone = 'Format de téléphone invalide';
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

  // Formater les données avant envoi
  formatContactFormData(formData) {
    return {
      nom: formData.nom?.trim(),
      email: formData.email?.trim().toLowerCase(),
      telephone: formData.telephone?.trim(),
      sujet: formData.sujet?.trim(),
      message: formData.message?.trim(),
      type_formulaire: formData.type_formulaire || 'contact',
      document_url: formData.document_url || null
    };
  }
}

// Instance singleton
const contactFormService = new ContactFormService();

export default contactFormService;
