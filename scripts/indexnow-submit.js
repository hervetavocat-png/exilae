// Script pour soumettre automatiquement les URLs à IndexNow
// IndexNow permet une indexation immédiate sur Bing, Yandex et autres moteurs compatibles

const https = require('https');

// Configuration
const DOMAIN = 'urgence-oqtf.fr';
const PROTOCOL = 'https';

// Liste des URLs à soumettre
const urls = [
  `${PROTOCOL}://${DOMAIN}/`,
  `${PROTOCOL}://${DOMAIN}/oqtf-simple`,
  `${PROTOCOL}://${DOMAIN}/oqtf-assignation`,
  `${PROTOCOL}://${DOMAIN}/oqtf-placement`,
  `${PROTOCOL}://${DOMAIN}/oqtf-30-jours`,
  `${PROTOCOL}://${DOMAIN}/irtf`,
  `${PROTOCOL}://${DOMAIN}/paris`,
  `${PROTOCOL}://${DOMAIN}/nice`,
  `${PROTOCOL}://${DOMAIN}/blog`,
  `${PROTOCOL}://${DOMAIN}/about`,
  `${PROTOCOL}://${DOMAIN}/mentions-legales`,
  `${PROTOCOL}://${DOMAIN}/politique-confidentialite`
];

// Fonction pour soumettre à IndexNow
function submitToIndexNow(urlList) {
  const data = JSON.stringify({
    host: DOMAIN,
    urlList: urlList
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, (res) => {
    console.log(`✅ IndexNow - Status: ${res.statusCode}`);
    
    if (res.statusCode === 200) {
      console.log('✅ URLs soumises avec succès à IndexNow');
      console.log(`📍 ${urlList.length} URLs indexées`);
    } else {
      console.log(`⚠️ Réponse: ${res.statusCode}`);
    }

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error('❌ Erreur IndexNow:', error.message);
  });

  req.write(data);
  req.end();
}

// Exécution
console.log('🚀 Soumission des URLs à IndexNow...');
console.log(`📍 Domaine: ${DOMAIN}`);
console.log(`📄 Nombre d'URLs: ${urls.length}\n`);

submitToIndexNow(urls);

