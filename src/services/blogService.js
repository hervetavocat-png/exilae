import apiService from './apiService';

class BlogService {
  // Récupérer tous les articles
  async getAllArticles(limit = 20, offset = 0) {
    try {
      const response = await apiService.get('/blog', { limit, offset });
      return {
        success: true,
        data: response.data,
        count: response.count,
        pagination: response.pagination
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      return {
        success: false,
        message: 'Erreur lors de la récupération des articles',
        error: error.message
      };
    }
  }

  // Récupérer un article par ID
  async getArticleById(id) {
    try {
      const response = await apiService.get(`/blog/${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'article:', error);
      return {
        success: false,
        message: 'Article non trouvé',
        error: error.message
      };
    }
  }

  // Créer un nouvel article
  async createArticle(data) {
    try {
      const response = await apiService.post('/blog', data);
      return {
        success: true,
        message: 'Article créé avec succès',
        data: response.data
      };
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      return {
        success: false,
        message: 'Erreur lors de la création de l\'article',
        error: error.message
      };
    }
  }

  // Mettre à jour un article
  async updateArticle(id, data) {
    try {
      const response = await apiService.put(`/blog/${id}`, data);
      return {
        success: true,
        message: 'Article mis à jour avec succès',
        data: response.data
      };
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'article:', error);
      return {
        success: false,
        message: 'Erreur lors de la mise à jour de l\'article',
        error: error.message
      };
    }
  }

  // Supprimer un article
  async deleteArticle(id) {
    try {
      const response = await apiService.delete(`/blog/${id}`);
      return {
        success: true,
        message: 'Article supprimé avec succès',
        data: response.data
      };
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      return {
        success: false,
        message: 'Erreur lors de la suppression de l\'article',
        error: error.message
      };
    }
  }

  // Récupérer les statistiques
  async getStats() {
    try {
      const response = await apiService.get('/blog/stats/overview');
      return {
        success: true,
        data: response.stats
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return {
        success: false,
        message: 'Erreur lors de la récupération des statistiques',
        error: error.message
      };
    }
  }
}

// Instance singleton
const blogService = new BlogService();

export default blogService;

