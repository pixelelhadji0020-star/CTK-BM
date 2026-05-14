# CTK&BM — Site vitrine

Site vitrine multi-catégories (Téléphones, Voitures, Chaussures) avec interface admin.

## Stack
- React 18 + Vite
- React Router v6
- Lucide Icons
- Persistance : localStorage

## Installation locale

```bash
npm install
npm run dev
```

## Déploiement sur Vercel via GitHub

1. Pousse ce projet sur un dépôt GitHub :
   ```bash
   git init
   git add .
   git commit -m "Initial commit CTK&BM"
   git branch -M main
   git remote add origin https://github.com/TON_USERNAME/ctk-bm.git
   git push -u origin main
   ```

2. Va sur [vercel.com](https://vercel.com), connecte-toi avec GitHub.

3. Clique sur **"Add New Project"** → sélectionne le dépôt `ctk-bm`.

4. Vercel détecte automatiquement Vite. Les paramètres par défaut sont corrects :
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`

5. Clique sur **Deploy** → ton site sera en ligne en 1 minute !

## Interface Admin

Accès via `/admin` sur le site (lien discret en bas du footer).

**Mot de passe** : `ctkbm2024`

> ⚠️ Pour changer le mot de passe, modifie la constante `ADMIN_PASSWORD` dans `src/pages/Admin.jsx`.

## WhatsApp

Le numéro configuré est **+221 77 101 85 57**.  
Pour le modifier : `src/data/products.js` → constante `WHATSAPP_NUMBER`.

## Ajouter des produits via l'admin

1. Connecte-toi sur `/admin`
2. Choisis la catégorie
3. Clique **Ajouter**
4. Remplis nom, prix, URL image et caractéristiques
5. Sauvegarde → le produit apparaît immédiatement sur le site

> Les données sont stockées dans le `localStorage` du navigateur.
