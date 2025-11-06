# 🛡️ Protection XSS et SQL Injection

Ce projet implémente une **protection modérée** contre les attaques XSS et SQL Injection, permettant l'utilisation normale des formulaires tout en bloquant les tentatives malveillantes.

## 📋 Ce qui est protégé

### ✅ Côté Frontend (`src/utils/sanitize.js`)
- **Suppression des balises dangereuses** :
  - `<script>...</script>` → Supprimé
  - `<iframe>...</iframe>` → Supprimé
  - `javascript:` dans les URL → Supprimé
  
- **Suppression des événements JavaScript inline** :
  - `onclick="..."` → Supprimé
  - `onerror="..."` → Supprimé
  - Tous les événements `onXXX` → Supprimés

- **Validation des emails et téléphones** :
  - Format d'email valide requis
  - Pas de caractères suspects (`< > ; ' " \`)
  - Téléphones : format international accepté

- **Détection SQL Injection** :
  - `DROP TABLE`, `DELETE TABLE`, `TRUNCATE` → Bloqué
  - `UNION SELECT` → Bloqué
  - `; DROP`, `; DELETE` → Bloqué
  - `exec()`, `execute()` → Bloqué

### ✅ Côté Backend (`backend/middleware/sanitize.js`)
- **Middleware automatique** appliqué à toutes les routes
- Sanitise `req.body`, `req.query`, `req.params`
- **Bloque les requêtes** contenant du SQL dangereux (erreur 400)
- Nettoie automatiquement les données avant stockage en base

## 🧪 Tests de validation

### Test Frontend
```bash
cd exilae
node test-protection.js
```

**Résultats attendus** :
- ✅ Balises `<script>` supprimées
- ✅ Événements JavaScript bloqués
- ✅ SQL Injection détecté
- ✅ Texte normal autorisé

### Test Backend (API)
```bash
# Terminal 1 : Démarrer le serveur
cd backend
npm start

# Terminal 2 : Lancer les tests
cd ..
node test-api-protection.js
```

**Résultats attendus** :
- ✅ XSS sanitisé (balises supprimées)
- ✅ SQL Injection bloqué (erreur 400)
- ✅ Formulaire normal accepté

## 📝 Exemples d'utilisation

### Dans un composant React

```javascript
import { sanitizeFormData } from '../utils/sanitize'

const handleSubmit = async (e) => {
  e.preventDefault()
  
  // Sanitiser les données
  const sanitized = sanitizeFormData(formData)
  
  if (!sanitized.isValid) {
    setErrors(sanitized.errors)
    return
  }
  
  // Utiliser les données nettoyées
  await api.submit(sanitized.data)
}
```

### Dans une route backend

Le middleware est **automatique**, rien à faire !  
Toutes les données sont sanitisées avant d'atteindre vos routes.

```javascript
// Le middleware sanitise automatiquement req.body
app.post('/api/contact', (req, res) => {
  // req.body est déjà sanitisé ici
  const { nom, email, message } = req.body
  // ...
})
```

## ⚖️ Équilibre Sécurité / Usabilité

### ✅ Ce qui EST autorisé
- Texte normal avec ponctuation : `Bonjour, comment allez-vous ?`
- Apostrophes dans le texte : `J'ai besoin d'aide`
- Guillemets : `Il m'a dit "bonjour"`
- Accents et caractères spéciaux : `éèêàç`
- Téléphones internationaux : `+33 6 12 34 56 78`
- Emails standards : `contact@urgence-oqtf.fr`

### ❌ Ce qui EST bloqué
- Balises script : `<script>alert('XSS')</script>`
- Événements JS : `<img onerror="alert(1)">`
- SQL dangereux : `'; DROP TABLE users; --`
- Injections : `UNION SELECT password FROM users`
- JavaScript dans URL : `javascript:alert(1)`

## 🔧 Configuration

### Ajuster le niveau de protection

**Plus strict** (frontend) :
```javascript
// Dans src/utils/sanitize.js
// Ajouter plus de patterns à détecter
const dangerousPatterns = [
  // ... patterns existants
  /(SELECT\s+.*\s+FROM)/i,  // Bloquer tous les SELECT
  /(INSERT\s+INTO)/i         // Bloquer tous les INSERT
]
```

**Moins strict** (si trop de faux positifs) :
```javascript
// Supprimer certains patterns moins critiques
// Par exemple, autoriser les commentaires SQL --
```

## 📊 Logs et monitoring

Le middleware log automatiquement :
- Requêtes bloquées (SQL Injection détecté)
- Données sanitisées
- Erreurs de traitement

Consultez les logs du serveur :
```bash
cd backend
npm start
# Les logs s'affichent dans la console
```

## 🚀 Déploiement

La protection est **automatiquement active** en production.

Aucune configuration supplémentaire nécessaire.

## 📚 Ressources

- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

## ⚠️ Limitations

Cette protection est **modérée** et ne remplace pas :
- ✅ Des requêtes SQL paramétrées (déjà utilisées avec `pg`)
- ✅ Une validation stricte côté serveur
- ✅ Des tests de sécurité réguliers
- ✅ Un WAF (Web Application Firewall) en production

**Recommandation** : Pour une protection maximale en production, envisagez :
- Cloudflare WAF
- Rate limiting
- CAPTCHA sur les formulaires
- Monitoring des logs d'attaque

