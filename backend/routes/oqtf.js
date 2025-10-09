const express = require('express');
const OQTFUrgenceModel = require('../models/OQTFUrgence');
const router = express.Router();

// POST /api/oqtf - Créer une nouvelle demande OQTF urgente
router.post('/', async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      telephone,
      date_naissance,
      nationalite,
      numero_oqtf,
      date_reception_oqtf,
      type_oqtf,
      delai_restant,
      prefecture,
      situation_familiale,
      enfants_scolarises,
      emploi_actuel,
      duree_sejour_france,
      documents_disponibles,
      description_situation,
      aide_juridictionnelle,
      priorite
    } = req.body;

    // Validation
    if (!nom || !prenom || !email || !telephone || !numero_oqtf || !date_reception_oqtf) {
      return res.status(400).json({
        error: 'Les champs nom, prénom, email, téléphone, numéro OQTF et date de réception sont obligatoires'
      });
    }

    const oqtfData = {
      nom, prenom, email, telephone, date_naissance, nationalite,
      numero_oqtf, date_reception_oqtf, type_oqtf, delai_restant,
      prefecture, situation_familiale, enfants_scolarises,
      emploi_actuel, duree_sejour_france, documents_disponibles,
      description_situation, aide_juridictionnelle, priorite
    };

    const newOQTF = await OQTFUrgenceModel.create(oqtfData);

    res.status(201).json({
      success: true,
      message: 'Demande OQTF urgente créée avec succès',
      data: {
        id: newOQTF.id,
        delai_restant: newOQTF.delai_restant,
        priorite: newOQTF.priorite,
        created_at: newOQTF.created_at
      }
    });

  } catch (error) {
    console.error('Erreur création demande OQTF:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/oqtf - Récupérer toutes les demandes OQTF
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const oqtfDemandes = await OQTFUrgenceModel.findAll(limit, offset);

    res.json({
      success: true,
      data: oqtfDemandes,
      count: oqtfDemandes.length
    });

  } catch (error) {
    console.error('Erreur récupération demandes OQTF:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// GET /api/oqtf/critical - Récupérer les cas critiques
router.get('/critical', async (req, res) => {
  try {
    const criticalCases = await OQTFUrgenceModel.findCritical();

    res.json({
      success: true,
      data: criticalCases,
      count: criticalCases.length,
      message: 'Cas critiques (délai ≤ 7 jours)'
    });

  } catch (error) {
    console.error('Erreur récupération cas critiques:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// GET /api/oqtf/stats - Statistiques des délais
router.get('/stats', async (req, res) => {
  try {
    const stats = await OQTFUrgenceModel.getStatsByDelay();

    res.json({
      success: true,
      data: {
        critique: parseInt(stats.critique),
        urgent: parseInt(stats.urgent),
        important: parseInt(stats.important),
        normal: parseInt(stats.normal),
        total: parseInt(stats.total)
      }
    });

  } catch (error) {
    console.error('Erreur récupération statistiques:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// GET /api/oqtf/type/:type - Récupérer par type d'OQTF
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const oqtfByType = await OQTFUrgenceModel.findByType(type);

    res.json({
      success: true,
      data: oqtfByType,
      count: oqtfByType.length,
      type: type
    });

  } catch (error) {
    console.error('Erreur récupération par type:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// PUT /api/oqtf/:id/status - Mettre à jour le statut
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const updatedOQTF = await OQTFUrgenceModel.updateStatus(id, statut);

    if (!updatedOQTF) {
      return res.status(404).json({
        error: 'Demande OQTF non trouvée'
      });
    }

    res.json({
      success: true,
      message: 'Statut mis à jour avec succès',
      data: updatedOQTF
    });

  } catch (error) {
    console.error('Erreur mise à jour statut OQTF:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

// PUT /api/oqtf/:id/priority - Mettre à jour la priorité
router.put('/:id/priority', async (req, res) => {
  try {
    const { id } = req.params;
    const { priorite } = req.body;

    const updatedOQTF = await OQTFUrgenceModel.updatePriority(id, priorite);

    if (!updatedOQTF) {
      return res.status(404).json({
        error: 'Demande OQTF non trouvée'
      });
    }

    res.json({
      success: true,
      message: 'Priorité mise à jour avec succès',
      data: updatedOQTF
    });

  } catch (error) {
    console.error('Erreur mise à jour priorité:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur'
    });
  }
});

module.exports = router;
