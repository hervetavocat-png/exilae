// Test direct de l'API Brevo
const { envoyerNotificationOQTF } = require('./config/brevo');

const testData = {
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean.dupont@example.com',
  telephone: '+33612345678',
  type_oqtf: 'OQTF avec délai de départ volontaire',
  description_situation: 'Je suis en France depuis 5 ans avec ma famille.',
  delai_restant: 5,
  prefecture: 'Paris',
  priorite: 1
};

async function testBrevo() {
  console.log('🧪 Test direct de l\'envoi d\'email Brevo...\n');

  try {
    const result = await envoyerNotificationOQTF(testData);
    console.log('\n✅ Résultat:', result);

    if (result.success) {
      console.log('\n🎉 Email envoyé avec succès !');
      console.log('📧 Vérifie ton email: stevenkuti20@gmail.com');
    } else {
      console.log('\n❌ Échec de l\'envoi:', result.error);
    }
  } catch (error) {
    console.error('\n❌ Erreur:', error);
  }
}

testBrevo();
