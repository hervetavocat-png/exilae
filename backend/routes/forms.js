const express = require('express');
const ContactFormModel = require('../models/ContactForm');
const router = express.Router();

// POST /api/forms/contact - Créer un nouveau formulaire de contact
router.post('/contact', async (req, res) => {
  try {
    const {
      nom,
      email,
      telephone,
      sujet,
      message,
      type_formulaire
    } = req.body;

    // Validation basique
    if (!nom || !email || !message) {
      return res.status(400).json({
        error: 'Les champs nom, email et message sont obligatoires'
      });
    }

    // Récupérer l'IP et User-Agent
    const ip_address = req.ip || req.connection.remoteAddress;
    const user_agent = req.get('User-Agent');

    const formData = {
      nom,
      email,
      telephone,
      sujet,
      message,
      type_formulaire,
      ip_address,
      user_agent
    };

    const newForm = await ContactFormModel.create(formData);

    res.status(201).json({
      success: true,
      message: 'Formulaire de contact envoyé avec succès',
      data: {
        id: newForm.id,
        created_at: newForm.created_at
      }
    });

  } catch (error) {
    console.error('Erreur création formulaire contact:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/forms/contact - Récupérer les formulaires de contact (admin)
router.get('/contact', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const forms = await ContactFormModel.findAll(limit, offset);
    const total = await ContactFormModel.count();

    res.json({
      success: true,
      data: forms,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Erreur récupération formulaires contact:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// GET /api/forms/contact/:id - Récupérer un formulaire spécifique
router.get('/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const form = await ContactFormModel.findById(id);

    if (!form) {
      return res.status(404).json({
        error: 'Formulaire non trouvé'
      });
    }

    res.json({
      success: true,
      data: form
    });

  } catch (error) {
    console.error('Erreur récupération formulaire:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// GET /api/forms/contact/by-email/:email - Récupérer par email
router.get('/contact/by-email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const forms = await ContactFormModel.findByEmail(email);

    res.json({
      success: true,
      data: forms,
      count: forms.length
    });

  } catch (error) {
    console.error('Erreur récupération par email:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

module.exports = router;
