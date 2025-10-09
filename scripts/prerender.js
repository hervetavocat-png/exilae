const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const express = require('express');

// Configuration
const DIST_DIR = path.join(__dirname, '../dist');
const PORT = 4173;

async function prerenderRoutes() {
  console.log('🚀 Démarrage du prerendering...\n');

  // 1. Démarrer un serveur express pour servir le build
  const app = express();
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
  
  const server = app.listen(PORT, () => {
    console.log(`✅ Serveur de prerendering démarré sur http://localhost:${PORT}`);
  });

  // 2. Récupérer la liste des articles depuis l'API
  console.log('\n📚 Récupération de la liste des articles...');
  
  let articles = [];
  try {
    const API_URL = process.env.VITE_API_URL || 'http://localhost:5001';
    const response = await fetch(`${API_URL}/api/blog?limit=100`);
    const data = await response.json();
    articles = data.data || [];
    console.log(`✅ ${articles.length} article(s) trouvé(s)`);
  } catch (error) {
    console.error('❌ Erreur récupération articles:', error.message);
    console.log('⚠️  Continuation sans articles...');
  }

  // 3. Liste des routes à prerenderiser
  const routes = [
    // Page d'accueil
    { path: '/', output: 'index.html' },
    
    // Pages OQTF
    { path: '/oqtf-assignation', output: 'oqtf-assignation/index.html' },
    { path: '/oqtf-simple', output: 'oqtf-simple/index.html' },
    { path: '/oqtf-placement', output: 'oqtf-placement/index.html' },
    { path: '/oqtf-30-jours', output: 'oqtf-30-jours/index.html' },
    { path: '/irtf', output: 'irtf/index.html' },
    
    // Pages villes
    { path: '/paris', output: 'paris/index.html' },
    { path: '/nice', output: 'nice/index.html' },
    
    // Pages blog
    { path: '/blog', output: 'blog/index.html' },
    ...articles.map(article => ({
      path: `/blog/${article.id}`,
      output: `blog/${article.id}/index.html`
    })),
    
    // Pages informatives
    { path: '/about', output: 'about/index.html' },
    { path: '/mentions-legales', output: 'mentions-legales/index.html' },
    { path: '/politique-confidentialite', output: 'politique-confidentialite/index.html' }
  ];

  console.log(`\n🔧 ${routes.length} route(s) à prerenderiser\n`);

  // 4. Lancer Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const route of routes) {
      const url = `http://localhost:${PORT}${route.path}`;
      console.log(`📄 Prerendering: ${route.path}`);

      const page = await browser.newPage();
      
      // Attendre le chargement complet
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Attendre un peu pour que React finisse de renderer
      await page.waitForTimeout(1000);

      // Récupérer le HTML
      const html = await page.content();

      // Sauvegarder le fichier
      const outputPath = path.join(DIST_DIR, route.output);
      const outputDir = path.dirname(outputPath);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, html);
      console.log(`  ✅ Sauvegardé: ${route.output}`);

      await page.close();
    }

    console.log(`\n✨ Prerendering terminé! ${routes.length} page(s) générée(s)\n`);
  } catch (error) {
    console.error('\n❌ Erreur lors du prerendering:', error);
    throw error;
  } finally {
    await browser.close();
    server.close();
  }
}

// Fonction pour générer le sitemap.xml
function generateSitemap() {
  console.log('🗺️  Génération du sitemap.xml...');
  
  const SITE_URL = 'https://votre-site.fr'; // À remplacer par votre URL
  const routes = fs.readdirSync(DIST_DIR, { recursive: true, withFileTypes: true })
    .filter(dirent => dirent.isFile() && dirent.name === 'index.html')
    .map(dirent => {
      const relativePath = path.relative(DIST_DIR, path.join(dirent.path || dirent.parentPath, dirent.name));
      return relativePath.replace(/index\.html$/, '').replace(/\\/g, '/');
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}/${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
  console.log(`✅ Sitemap généré avec ${routes.length} URL(s)\n`);
}

// Exécution
(async () => {
  try {
    await prerenderRoutes();
    generateSitemap();
    console.log('🎉 Build SEO-ready terminé!\n');
    process.exit(0);
  } catch (error) {
    console.error('💥 Erreur fatale:', error);
    process.exit(1);
  }
})();

