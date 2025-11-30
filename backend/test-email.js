// Test d'envoi d'email OQTF
const axios = require('axios');

const testData = {
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean.dupont@example.com',
  telephone: '+33612345678',
  date_naissance: '1990-05-15',
  nationalite: 'Algérienne',
  numero_oqtf: 'OQTF-2024-12345',
  date_reception_oqtf: '2024-11-15',
  type_oqtf: 'OQTF avec délai de départ volontaire',
  delai_restant: 5,
  prefecture: 'Paris',
  situation_familiale: 'Marié(e) avec enfants',
  enfants_scolarises: true,
  emploi_actuel: 'Employé',
  duree_sejour_france: 5,
  documents_disponibles: ['Passeport', 'Acte de naissance'],
  description_situation: 'Je suis en France depuis 5 ans avec ma famille. J\'ai reçu une OQTF il y a quelques jours et je cherche une aide juridique urgente.',
  aide_juridictionnelle: false,
  priorite: 1
};

async function testEmailNotification() {
  try {
    console.log('🧪 Test d\'envoi de notification email OQTF...\n');
    console.log('📤 Envoi de la requête POST vers http://localhost:5001/api/oqtf\n');

    const response = await axios.post('http://localhost:5001/api/oqtf', testData);

    console.log('✅ Réponse du serveur:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('\n📧 Vérifie ton email: stevenkuti20@gmail.com');
    console.log('Tu devrais avoir reçu un email de notification !');

  } catch (error) {
    console.error('❌ Erreur lors du test:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

testEmailNotification();
