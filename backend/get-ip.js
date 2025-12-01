const https = require('https');

// Récupérer l'IP publique du serveur
https.get('https://api.ipify.org?format=json', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const ip = JSON.parse(data).ip;
    console.log('🌐 Adresse IP publique du serveur:', ip);
    console.log('📋 Copiez cette IP et ajoutez-la aux adresses autorisées dans Brevo');
  });
}).on('error', (err) => {
  console.error('❌ Erreur:', err.message);
});
