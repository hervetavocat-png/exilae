# 🔧 Guide d'Administration - Exilae Backend

## 📋 Vue d'ensemble

Ce document contient toutes les informations nécessaires pour administrer et maintenir le système backend d'Exilae, incluant la base de données Supabase, l'API Express et le système d'upload de fichiers.

---

## 🔑 Informations de Connexion

### Supabase Dashboard
- **URL** : https://supabase.com/dashboard
- **Projet ID** : `kguptfraqfwogfcdrhvj`
- **URL du projet** : https://kguptfraqfwogfcdrhvj.supabase.co

### Clés API Supabase
```env
# URL de base Supabase
SUPABASE_URL=https://kguptfraqfwogfcdrhvj.supabase.co

# Clé publique (pour le frontend)
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndXB0ZnJhcWZ3b2dmY2RyaHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MjgyNzgsImV4cCI6MjA3NTEwNDI3OH0.CvtSQKLSJRD6IUhGWWICIT8XOgpCmYhNXJ0s2F3UxeY

# Clé service (pour le backend - CONFIDENTIELLE)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndXB0ZnJhcWZ3b2dmY2RyaHZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTUyODI3OCwiZXhwIjoyMDc1MTA0Mjc4fQ.mPmz28mRX1KXLMWWyCur1GgvrQDV0odD6_rlyjAOW8U
```

### Base de Données PostgreSQL
```env
# Connexion directe
DATABASE_URL=postgresql://postgres:Edward2002%40%40@db.kguptfraqfwogfcdrhvj.supabase.co:5432/postgres

# Connexion via pooler (recommandée)
DATABASE_POOLER_URL=postgresql://postgres.kguptfraqfwogfcdrhvj:Edward2002%40%40@aws-1-eu-west-3.pooler.supabase.com:6543/postgres

# Connexion pooler alternative
DATABASE_POOLER_ALT_URL=postgresql://postgres.kguptfraqfwogfcdrhvj:Edward2002%40%40@aws-1-eu-west-3.pooler.supabase.com:5432/postgres
```

---

## 🚀 Démarrage du Serveur

### Prérequis
- Node.js (v18+)
- npm ou yarn

### Installation
```bash
cd exilae/backend
npm install
```

### Démarrage
```bash
# Mode développement (avec auto-reload)
npm run dev

# Mode production
npm start

# Ou directement
node server.js
```

### Vérification
- **API** : http://localhost:5000
- **Health Check** : http://localhost:5000/api/health
- **Test DB** : http://localhost:5000/api/db-test

---

## 📊 Base de Données - Tables Créées

Le système crée automatiquement ces tables :

### 1. `contact_forms`
Formulaires de contact du site web
```sql
- id (UUID, PRIMARY KEY)
- nom (VARCHAR)
- email (VARCHAR)
- telephone (VARCHAR)
- sujet (VARCHAR)
- message (TEXT)
- document_url (VARCHAR) -- URL du document uploadé
- type_formulaire (VARCHAR)
- created_at (TIMESTAMP)
```

### 2. `consultation_requests`
Demandes de consultation via popup
```sql
- id (UUID, PRIMARY KEY)
- nom (VARCHAR)
- prenom (VARCHAR)
- email (VARCHAR)
- telephone (VARCHAR)
- ville_consultation (VARCHAR)
- situation_actuelle (TEXT)
- type_procedure (VARCHAR)
- urgence_niveau (VARCHAR)
- document_url (VARCHAR) -- URL du document uploadé
- message_complementaire (TEXT)
- documents_fournis (JSONB)
- created_at (TIMESTAMP)
```

### 3. `oqtf_urgence`
Demandes OQTF urgentes
```sql
- id (UUID, PRIMARY KEY)
- nom (VARCHAR)
- prenom (VARCHAR)
- email (VARCHAR)
- telephone (VARCHAR)
- type_oqtf (VARCHAR)
- delai_recours (INTEGER)
- situation_familiale (VARCHAR)
- document_url (VARCHAR)
- message (TEXT)
- created_at (TIMESTAMP)
```

### 4. `newsletter_subscriptions`
Abonnements newsletter
```sql
- id (UUID, PRIMARY KEY)
- email (VARCHAR UNIQUE)
- nom (VARCHAR)
- statut (VARCHAR DEFAULT 'active')
- created_at (TIMESTAMP)
```

### 5. `avis_juridiques`
Avis juridiques (pour extension future)
```sql
- id (UUID, PRIMARY KEY)
- titre (VARCHAR)
- contenu (TEXT)
- categorie (VARCHAR)
- created_at (TIMESTAMP)
```

---

## 📁 Système de Stockage de Fichiers

### Bucket Supabase Storage
- **Nom** : `admin-uploads`
- **Type** : Privé (accès sécurisé)
- **Localisation** : Dashboard Supabase → Storage → admin-uploads

### Structure des Dossiers
```
admin-uploads/
├── contact-documents/          # Documents du formulaire de contact
├── consultation-documents/     # Documents du popup de consultation
└── documents/                  # Documents de test/divers
```

### Types de Fichiers Autorisés
- **PDF** : Documents officiels, OQTF
- **Images** : JPG, JPEG, PNG, WebP
- **Taille max** : 10MB par fichier

### Accès aux Fichiers
1. **Dashboard Supabase** → Storage → admin-uploads
2. **API** : URLs signées générées automatiquement
3. **Sécurité** : Accès privé, URLs temporaires

---

## 🔗 Endpoints API Disponibles

### Formulaires
- `POST /api/forms/contact` - Soumission formulaire de contact
- `GET /api/forms` - Liste des formulaires (admin)

### Consultations
- `POST /api/consultations` - Demande de consultation
- `GET /api/consultations` - Liste des consultations (admin)

### OQTF
- `POST /api/oqtf` - Demande OQTF urgente
- `GET /api/oqtf` - Liste des demandes OQTF (admin)

### Newsletter
- `POST /api/newsletter/subscribe` - Abonnement newsletter
- `GET /api/newsletter` - Liste des abonnés (admin)

### Upload de Fichiers
- `POST /api/uploads/single` - Upload d'un fichier
- `POST /api/uploads/multiple` - Upload de plusieurs fichiers
- `DELETE /api/uploads/delete/:fileName` - Suppression d'un fichier
- `GET /api/uploads/list` - Liste des fichiers
- `GET /api/uploads/signed-url/:fileName` - URL signée pour accès
- `GET /api/uploads/info` - Informations du service

### Système
- `GET /api/health` - Vérification de santé
- `GET /api/db-test` - Test de connexion base de données
- `GET /` - Informations générales de l'API

---

## 🛠️ Administration Quotidienne

### Consulter les Demandes
1. **Via Supabase Dashboard** :
   - Tables → Voir les données directement
   - Filtres et recherche disponibles

2. **Via API** (avec outil comme Postman) :
   ```bash
   GET http://localhost:5000/api/consultations
   GET http://localhost:5000/api/forms
   GET http://localhost:5000/api/oqtf
   ```

### Gérer les Fichiers Uploadés
1. **Dashboard Supabase** → Storage → admin-uploads
2. **Actions possibles** :
   - Prévisualiser les images
   - Télécharger les documents
   - Supprimer les fichiers
   - Organiser par dossiers

### Surveillance du Système
- **Logs serveur** : Visibles dans la console
- **Health check** : http://localhost:5000/api/health
- **Base de données** : http://localhost:5000/api/db-test

---

## 🔒 Sécurité

### Variables d'Environnement (.env)
```env
PORT=5000
NODE_ENV=development

# Base de données
DATABASE_POOLER_URL=postgresql://postgres.kguptfraqfwogfcdrhvj:Edward2002%40%40@aws-1-eu-west-3.pooler.supabase.com:6543/postgres

# Supabase Storage
SUPABASE_URL=https://kguptfraqfwogfcdrhvj.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndXB0ZnJhcWZ3b2dmY2RyaHZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTUyODI3OCwiZXhwIjoyMDc1MTA0Mjc4fQ.mPmz28mRX1KXLMWWyCur1GgvrQDV0odD6_rlyjAOW8U
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndXB0ZnJhcWZ3b2dmY2RyaHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MjgyNzgsImV4cCI6MjA3NTEwNDI3OH0.CvtSQKLSJRD6IUhGWWICIT8XOgpCmYhNXJ0s2F3UxeY
```

### Bonnes Pratiques
- ⚠️ **JAMAIS** partager la clé `SERVICE_ROLE_KEY` publiquement
- 🔒 Garder le fichier `.env` privé
- 🔄 Changer les mots de passe régulièrement
- 📊 Surveiller les logs d'accès

---

## 🚨 Dépannage

### Serveur ne démarre pas
```bash
# Vérifier les dépendances
npm install

# Vérifier le fichier .env
cat .env

# Démarrer en mode debug
DEBUG=* npm run dev
```

### Erreur de base de données
1. Vérifier la connexion internet
2. Tester : http://localhost:5000/api/db-test
3. Vérifier les URLs de connexion dans `.env`

### Problème d'upload
1. Vérifier les clés Supabase dans `.env`
2. Tester : http://localhost:5000/api/uploads/info
3. Vérifier les permissions du bucket

### Logs utiles
```bash
# Logs du serveur
tail -f logs/server.log

# Logs en temps réel
npm run dev
```

---

## 📈 Extensions Futures

### Fonctionnalités à Ajouter
- [ ] Panel d'administration web
- [ ] Notifications email automatiques
- [ ] Système de tickets/suivi
- [ ] Statistiques et analytics
- [ ] Sauvegarde automatique
- [ ] API de recherche avancée

### Améliorations Techniques
- [ ] Rate limiting
- [ ] Cache Redis
- [ ] Monitoring avancé
- [ ] Tests automatisés
- [ ] CI/CD Pipeline

---

## 📞 Support Technique

### Architecture du Système
- **Frontend** : React + Vite
- **Backend** : Node.js + Express
- **Base de données** : PostgreSQL (Supabase)
- **Stockage** : Supabase Storage
- **Déploiement** : Local (extensible vers cloud)

### Contacts
- **Développeur** : Assistant IA
- **Documentation** : Ce fichier README_ADMIN.md
- **Code source** : `/exilae/backend/` et `/exilae/src/`

---

## ✅ Checklist de Maintenance

### Quotidienne
- [ ] Vérifier les nouvelles demandes
- [ ] Consulter les fichiers uploadés
- [ ] Surveiller les logs d'erreur

### Hebdomadaire
- [ ] Sauvegarder la base de données
- [ ] Nettoyer les fichiers temporaires
- [ ] Vérifier l'espace de stockage

### Mensuelle
- [ ] Analyser les statistiques d'usage
- [ ] Mettre à jour les dépendances
- [ ] Réviser les accès et permissions

---

**🎯 Système opérationnel et prêt pour la production !**

*Dernière mise à jour : Octobre 2025*
