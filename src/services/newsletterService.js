import apiService from './apiService';

class NewsletterService {
  // S'abonner à la newsletter
  async subscribe(subscriptionData) {
    try {
      const response = await apiService.post('/newsletter/subscribe', subscriptionData);
      
      return {
        success: true,
        message: response.message,
        action: response.action,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de l\'abonnement à la newsletter',
        error: error.message
      };
    }
  }

  // Se désabonner de la newsletter
  async unsubscribe(email) {
    try {
      const response = await apiService.post('/newsletter/unsubscribe', { email });
      
      return {
        success: true,
        message: response.message,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors du désabonnement',
        error: error.message
      };
    }
  }

  // Vérifier le statut d'un email
  async checkSubscriptionStatus(email) {
    try {
      const response = await apiService.get(`/newsletter/status/${email}`);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la vérification du statut',
        error: error.message
      };
    }
  }

  // Récupérer tous les abonnés (admin)
  async getAllSubscribers(page = 1, limit = 50) {
    try {
      const response = await apiService.get('/newsletter/subscribers', { page, limit });
      
      return {
        success: true,
        data: response.data,
        count: response.count
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des abonnés',
        error: error.message
      };
    }
  }

  // Récupérer les abonnés par intérêt
  async getSubscribersByInterest(interest) {
    try {
      const response = await apiService.get(`/newsletter/subscribers/interest/${interest}`);
      
      return {
        success: true,
        data: response.data,
        count: response.count,
        interest: response.interest
      };
    } catch (error) {
      return {
        success: false,
        message: `Erreur lors de la récupération des abonnés intéressés par ${interest}`,
        error: error.message
      };
    }
  }

  // Récupérer les statistiques de la newsletter
  async getNewsletterStats() {
    try {
      const response = await apiService.get('/newsletter/stats');
      
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

  // Valider les données d'abonnement
  validateSubscriptionForm(formData) {
    const errors = {};
    
    if (!formData.email || !this.isValidEmail(formData.email)) {
      errors.email = 'Un email valide est obligatoire';
    }
    
    if (formData.nom && formData.nom.trim().length < 2) {
      errors.nom = 'Le nom doit contenir au moins 2 caractères';
    }
    
    if (formData.prenom && formData.prenom.trim().length < 2) {
      errors.prenom = 'Le prénom doit contenir au moins 2 caractères';
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

  // Formater les données d'abonnement
  formatSubscriptionData(formData) {
    return {
      email: formData.email?.trim().toLowerCase(),
      nom: formData.nom?.trim() || null,
      prenom: formData.prenom?.trim() || null,
      interets: formData.interets || [],
      source: formData.source || 'website'
    };
  }

  // Obtenir les intérêts disponibles
  getAvailableInterests() {
    return [
      { value: 'OQTF', label: 'OQTF et procédures d\'éloignement' },
      { value: 'Naturalisation', label: 'Naturalisation française' },
      { value: 'Regroupement familial', label: 'Regroupement familial' },
      { value: 'Titre de séjour', label: 'Titres de séjour' },
      { value: 'Asile', label: 'Droit d\'asile' },
      { value: 'Actualités juridiques', label: 'Actualités du droit des étrangers' },
      { value: 'Conseils pratiques', label: 'Conseils et démarches' },
      { value: 'Jurisprudence', label: 'Jurisprudence et évolutions légales' }
    ];
  }

  // Obtenir les sources d'abonnement
  getSubscriptionSources() {
    return [
      { value: 'website', label: 'Site web' },
      { value: 'contact_form', label: 'Formulaire de contact' },
      { value: 'consultation', label: 'Consultation' },
      { value: 'social_media', label: 'Réseaux sociaux' },
      { value: 'referral', label: 'Recommandation' },
      { value: 'other', label: 'Autre' }
    ];
  }

  // Vérifier si un email est déjà abonné (côté client)
  async isEmailSubscribed(email) {
    try {
      const result = await this.checkSubscriptionStatus(email);
      return result.success && result.data.statut === 'actif';
    } catch (error) {
      return false;
    }
  }

  // Abonnement rapide (email seulement)
  async quickSubscribe(email, source = 'website') {
    const subscriptionData = {
      email: email.trim().toLowerCase(),
      source
    };

    return this.subscribe(subscriptionData);
  }

  // Abonnement complet avec intérêts
  async fullSubscribe(email, nom, prenom, interets, source = 'website') {
    const subscriptionData = {
      email: email.trim().toLowerCase(),
      nom: nom?.trim(),
      prenom: prenom?.trim(),
      interets: interets || [],
      source
    };

    return this.subscribe(subscriptionData);
  }

  // Gérer la réponse d'abonnement pour l'UI
  handleSubscriptionResponse(response) {
    if (!response.success) {
      return {
        type: 'error',
        message: response.message || 'Erreur lors de l\'abonnement'
      };
    }

    switch (response.action) {
      case 'subscribed':
        return {
          type: 'success',
          message: 'Merci ! Vous êtes maintenant abonné à notre newsletter.'
        };
      case 'reactivated':
        return {
          type: 'success',
          message: 'Votre abonnement a été réactivé avec succès !'
        };
      case 'already_subscribed':
        return {
          type: 'info',
          message: 'Vous êtes déjà abonné à notre newsletter.'
        };
      default:
        return {
          type: 'success',
          message: response.message || 'Opération réussie'
        };
    }
  }
}

// Instance singleton
const newsletterService = new NewsletterService();

export default newsletterService;
