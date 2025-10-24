# Déploiement Exilae

## Configuration locale (développement)

Par défaut, le projet utilise **localhost:5001**

```bash
npm run dev
```

## Configuration production (Hostinger)

Pour déployer sur Hostinger, créez un fichier `.env` à la racine :

```env
VITE_API_URL=https://exilae.onrender.com/api
```

Puis buildez :

```bash
npm run build
```

Uploadez le contenu du dossier `dist/` sur Hostinger.

## Backend (Render)

Le backend est déployé sur : **https://exilae.onrender.com**

Variables d'environnement configurées sur Render Dashboard :
- `DATABASE_URL` - URL Supabase
- `SUPABASE_URL` - URL projet Supabase  
- `SUPABASE_KEY` - Clé API Supabase
- `SUPABASE_STORAGE_URL` - URL storage Supabase


