# API Exilae - Documentation des Endpoints

## Configuration
- **Base URL**: `http://localhost:5000/api`
- **Format**: JSON
- **Authentification**: Aucune (pour l'instant)

## 📋 Formulaires de Contact

### POST `/api/forms/contact`
Créer un nouveau formulaire de contact

**Body:**
```json
{
  "nom": "Dupont",
  "email": "contact@example.com",
  "telephone": "0123456789",
  "sujet": "Demande d'information",
  "message": "Votre message ici",
  "type_formulaire": "contact"
}
```

### GET `/api/forms/contact`
Récupérer tous les formulaires de contact (admin)

**Query params:**
- `page`: Numéro de page (défaut: 1)
- `limit`: Nombre d'éléments par page (défaut: 20)

## 🏛️ Demandes de Consultation

### POST `/api/consultations`
Créer une nouvelle demande de consultation

**Body:**
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "telephone": "0123456789",
  "date_naissance": "1990-01-01",
  "nationalite": "Française",
  "situation_actuelle": "Description de la situation",
  "type_procedure": "OQTF",
  "urgence_niveau": "urgent",
  "ville_consultation": "Paris",
  "date_souhaitee": "2024-01-15",
  "heure_souhaitee": "14:00",
  "message_complementaire": "Informations supplémentaires"
}
```

### GET `/api/consultations`
Récupérer toutes les demandes de consultation

### GET `/api/consultations/urgent`
Récupérer uniquement les demandes urgentes

### PUT `/api/consultations/:id/status`
Mettre à jour le statut d'une demande

## 🚨 OQTF Urgence

### POST `/api/oqtf`
Créer une nouvelle demande OQTF urgente

**Body:**
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "telephone": "0123456789",
  "date_naissance": "1990-01-01",
  "nationalite": "Algérienne",
  "numero_oqtf": "OQTF-2024-001",
  "date_reception_oqtf": "2024-01-01",
  "type_oqtf": "OQTF avec délai",
  "delai_restant": 15,
  "prefecture": "Paris",
  "situation_familiale": "Marié avec enfants",
  "enfants_scolarises": true,
  "emploi_actuel": "Salarié",
  "duree_sejour_france": 5,
  "description_situation": "Description détaillée",
  "aide_juridictionnelle": false,
  "priorite": 1
}
```

### GET `/api/oqtf/critical`
Récupérer les cas critiques (délai ≤ 7 jours)

### GET `/api/oqtf/stats`
Obtenir les statistiques par délai

### GET `/api/oqtf/type/:type`
Récupérer les demandes par type d'OQTF

## 📧 Newsletter

### POST `/api/newsletter/subscribe`
S'abonner à la newsletter

**Body:**
```json
{
  "email": "user@example.com",
  "nom": "Dupont",
  "prenom": "Jean",
  "interets": ["OQTF", "Naturalisation"],
  "source": "website"
}
```

### POST `/api/newsletter/unsubscribe`
Se désabonner de la newsletter

**Body:**
```json
{
  "email": "user@example.com"
}
```

### GET `/api/newsletter/status/:email`
Vérifier le statut d'un email

### GET `/api/newsletter/stats`
Obtenir les statistiques de la newsletter

## 🔧 Utilitaires

### GET `/api/health`
Vérifier l'état du serveur

### GET `/api/db-test`
Tester la connexion à la base de données

## 📊 Codes de Réponse

- **200**: Succès
- **201**: Créé avec succès
- **400**: Erreur de validation
- **404**: Ressource non trouvée
- **500**: Erreur serveur

## 🗄️ Base de Données

Les tables sont créées automatiquement au démarrage du serveur si elles n'existent pas :

- `contact_forms`
- `consultation_requests`
- `oqtf_urgence`
- `newsletter_subscriptions`
- `avis_juridiques`

## 🚀 Utilisation depuis le Frontend

### Exemple avec fetch()

```javascript
// Envoyer un formulaire de contact
const submitContactForm = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/forms/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Formulaire envoyé avec succès!');
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// S'abonner à la newsletter
const subscribeNewsletter = async (email) => {
  try {
    const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erreur abonnement:', error);
  }
};
```
