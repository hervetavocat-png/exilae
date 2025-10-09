const express = require('express');
const router = express.Router();
const BlogModel = require('../models/Blog');
const db = require('../services/database');

// Récupérer tous les articles publiés
router.get('/', async (req, res) => {
  try {
    console.log('📝 Requête GET /api/blog reçue');
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const statut = req.query.statut;
    
    console.log('🔍 Paramètres:', { limit, offset, statut });
    
    let articles;
    if (statut && statut !== 'publié') {
      console.log('🔍 Recherche avec statut:', statut);
      articles = await BlogModel.findAll(statut, limit, offset);
    } else {
      console.log('🔍 Recherche articles publiés');
      articles = await BlogModel.findAllPublished(limit, offset);
    }
    
    console.log('✅ Articles trouvés:', articles.length);
    
    const total = await BlogModel.countPublished();
    console.log('📊 Total articles publiés:', total);
    
    res.json({
      success: true,
      data: articles,
      count: articles.length,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + articles.length < total
      }
    });
  } catch (error) {
    console.error('❌ Erreur récupération articles:', error);
    console.error('❌ Stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des articles',
      details: error.message,
      stack: error.stack
    });
  }
});

// Récupérer un article par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await BlogModel.findById(id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('❌ Erreur récupération article:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération de l\'article',
      details: error.message
    });
  }
});

// Créer un nouvel article (admin)
router.post('/', async (req, res) => {
  try {
    const article = await BlogModel.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Article créé avec succès',
      data: article
    });
  } catch (error) {
    console.error('❌ Erreur création article:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création de l\'article',
      details: error.message
    });
  }
});

// Mettre à jour un article (admin)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await BlogModel.update(id, req.body);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article non trouvé ou aucun champ à mettre à jour'
      });
    }
    
    res.json({
      success: true,
      message: 'Article mis à jour avec succès',
      data: article
    });
  } catch (error) {
    console.error('❌ Erreur mise à jour article:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la mise à jour de l\'article',
      details: error.message
    });
  }
});

// Supprimer un article (admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await BlogModel.delete(id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article non trouvé'
      });
    }
    
    res.json({
      success: true,
      message: 'Article supprimé avec succès',
      data: article
    });
  } catch (error) {
    console.error('❌ Erreur suppression article:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la suppression de l\'article',
      details: error.message
    });
  }
});

// Statistiques du blog
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await BlogModel.getStats();
    
    res.json({
      success: true,
      stats: stats
    });
  } catch (error) {
    console.error('❌ Erreur récupération stats:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des statistiques',
      details: error.message
    });
  }
});

// TEST - Route de debug
router.get('/debug/test', async (req, res) => {
  try {
    // Test 1: Connexion DB
    const testQuery = await db.query('SELECT NOW() as current_time');
    
    // Test 2: Vérifier la table
    const tableCheck = await db.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'blog_articles'
      ORDER BY ordinal_position
    `);
    
    // Test 3: Compter les articles
    const count = await db.query('SELECT COUNT(*) as total FROM blog_articles');
    
    // Test 4: Récupérer un article
    const sample = await db.query('SELECT * FROM blog_articles LIMIT 1');
    
    // Test 5: Tester la requête exacte du modèle
    let testResult;
    try {
      testResult = await db.query(`
        SELECT 
          id,
          titre as title,
          auteur as author,
          email_auteur as email_author,
          contenu as content,
          extrait as excerpt,
          statut as status,
          image_couverture as image_url,
          created_at,
          updated_at,
          published_at as published_date,
          created_by,
          updated_by
        FROM blog_articles 
        WHERE statut = 'publié' 
        ORDER BY published_at DESC, created_at DESC 
        LIMIT 5
      `);
    } catch (e) {
      testResult = { error: e.message, stack: e.stack };
    }
    
    res.json({
      success: true,
      tests: {
        dbConnection: testQuery.rows[0],
        tableColumns: tableCheck.rows,
        totalArticles: count.rows[0].total,
        sampleArticle: sample.rows[0] || 'Aucun article',
        queryTest: testResult.rows || testResult
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      stack: error.stack,
      code: error.code
    });
  }
});

module.exports = router;
