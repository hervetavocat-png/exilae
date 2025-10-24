const express = require('express');
const ConsultationRequestModel = require('../models/ConsultationRequest');
const router = express.Router();

// POST /api/consultations - Créer une nouvelle demande de consultation
router.post('/', async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      telephone,
      date_naissance,
      nationalite,
      situation_actuelle,
      type_procedure,
      urgence_niveau,
      ville_consultation,
      date_souhaitee,
      heure_souhaitee,
      message_complementaire,
      document_url,
      documents_fournis
    } = req.body;

    // Validation
    if (!nom || !prenom || !email || !telephone || !situation_actuelle) {
      return res.status(400).json({
        error: 'Les champs nom, prénom, email, téléphone et situation actuelle sont obligatoires'
      });
    }

    const consultationData = {
      nom,
      prenom,
      email,
      telephone,
      date_naissance,
      nationalite,
      situation_actuelle,
      type_procedure,
      urgence_niveau,
      ville_consultation,
      date_souhaitee,
      heure_souhaitee,
      message_complementaire,
      document_url,
      documents_fournis
    };

    const newConsultation = await ConsultationRequestModel.create(consultationData);

    res.status(201).json({
      success: true,
      message: 'Demande de consultation créée avec succès',
      data: {
        id: newConsultation.id,
        urgence_niveau: newConsultation.urgence_niveau,
        created_at: newConsultation.created_at
      }
    });

  } catch (error) {
    console.error('Erreur création demande consultation:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/consultations - Récupérer toutes les demandes
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const statut = req.query.statut;

    let consultations;
    if (statut) {
      consultations = await ConsultationRequestModel.findByStatus(statut, limit);
    } else {
      consultations = await ConsultationRequestModel.findAll(limit, offset);
    }

    res.json({
      success: true,
      data: consultations,
      count: consultations.length
    });

  } catch (error) {
    console.error('Erreur récupération consultations:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// GET /api/consultations/urgent - Récupérer les demandes urgentes
router.get('/urgent', async (req, res) => {
  try {
    const urgentConsultations = await ConsultationRequestModel.findUrgent();

    res.json({
      success: true,
      data: urgentConsultations,
      count: urgentConsultations.length
    });

  } catch (error) {
    console.error('Erreur récupération consultations urgentes:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// GET /api/consultations/:id - Récupérer une demande spécifique
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const consultation = await ConsultationRequestModel.findById(id);

    if (!consultation) {
      return res.status(404).json({
        error: 'Demande de consultation non trouvée'
      });
    }

    res.json({
      success: true,
      data: consultation
    });

  } catch (error) {
    console.error('Erreur récupération consultation:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// PUT /api/consultations/:id/status - Mettre à jour le statut
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    if (!statut) {
      return res.status(400).json({
        error: 'Le statut est obligatoire'
      });
    }

    const updatedConsultation = await ConsultationRequestModel.updateStatus(id, statut);

    if (!updatedConsultation) {
      return res.status(404).json({
        error: 'Demande de consultation non trouvée'
      });
    }

    res.json({
      success: true,
      message: 'Statut mis à jour avec succès',
      data: updatedConsultation
    });

  } catch (error) {
    console.error('Erreur mise à jour statut:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

module.exports = router;
