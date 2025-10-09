const express = require('express');
const NewsletterModel = require('../models/Newsletter');
const router = express.Router();

// POST /api/newsletter/subscribe - S'abonner à la newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const {
      email,
      nom,
      prenom,
      interets,
      source
    } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        error: 'L\'email est obligatoire'
      });
    }

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Format d\'email invalide'
      });
    }

    const ip_address = req.ip || req.connection.remoteAddress;

    const subscriptionData = {
      email,
      nom,
      prenom,
      interets,
      source,
      ip_address
    };

    const result = await NewsletterModel.subscribe(subscriptionData);

    let message;
    switch (result.action) {
      case 'subscribed':
        message = 'Abonnement à la newsletter réussi !';
        break;
      case 'reactivated':
        message = 'Votre abonnement a été réactivé !';
        break;
      case 'already_subscribed':
        message = 'Vous êtes déjà abonné à notre newsletter.';
        break;
    }

    res.status(result.action === 'already_subscribed' ? 200 : 201).json({
      success: true,
      message,
      action: result.action,
      data: {
        email: result.email,
        statut: result.statut
      }
    });

  } catch (error) {
    console.error('Erreur abonnement newsletter:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/newsletter/unsubscribe - Se désabonner
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'L\'email est obligatoire'
      });
    }

    const result = await NewsletterModel.unsubscribe(email);

    if (!result) {
      return res.status(404).json({
        error: 'Email non trouvé ou déjà désabonné'
      });
    }

    res.json({
      success: true,
      message: 'Désabonnement réussi',
      data: {
        email: result.email,
        date_desabonnement: result.date_desabonnement
      }
    });

  } catch (error) {
    console.error('Erreur désabonnement newsletter:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// GET /api/newsletter/status/:email - Vérifier le statut d'un email
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const status = await NewsletterModel.checkStatus(email);

    res.json({
      success: true,
      data: {
        email,
        statut: status.statut,
        date_inscription: status.date_inscription || null
      }
    });

  } catch (error) {
    console.error('Erreur vérification statut:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// GET /api/newsletter/subscribers - Récupérer tous les abonnés (admin)
router.get('/subscribers', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    const subscribers = await NewsletterModel.findAllActive(limit, offset);

    res.json({
      success: true,
      data: subscribers,
      count: subscribers.length
    });

  } catch (error) {
    console.error('Erreur récupération abonnés:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// GET /api/newsletter/subscribers/interest/:interest - Récupérer par intérêt
router.get('/subscribers/interest/:interest', async (req, res) => {
  try {
    const { interest } = req.params;
    const subscribers = await NewsletterModel.findByInterest(interest);

    res.json({
      success: true,
      data: subscribers,
      count: subscribers.length,
      interest: interest
    });

  } catch (error) {
    console.error('Erreur récupération par intérêt:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// GET /api/newsletter/stats - Statistiques de la newsletter
router.get('/stats', async (req, res) => {
  try {
    const stats = await NewsletterModel.getStats();

    res.json({
      success: true,
      data: {
        actifs: parseInt(stats.actifs),
        desabonnes: parseInt(stats.desabonnes),
        total: parseInt(stats.total),
        nouveaux_ce_mois: parseInt(stats.nouveaux_ce_mois)
      }
    });

  } catch (error) {
    console.error('Erreur récupération statistiques newsletter:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

module.exports = router;
