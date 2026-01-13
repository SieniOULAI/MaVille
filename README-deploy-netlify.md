Déployer `MaVille` sur Netlify

Prérequis:
- Un compte Netlify
- `NETLIFY_AUTH_TOKEN` et `NETLIFY_SITE_ID` (site créé dans Netlify)
- Node.js (optionnel localement pour compiler Tailwind)

Déploiement manuel (local):

1. Exporter les variables d'environnement:

```bash
export NETLIFY_AUTH_TOKEN="<votre-token>"
export NETLIFY_SITE_ID="<votre-site-id>"
```

2. Rendre le script exécutable et lancer:

```bash
chmod +x scripts/deploy_netlify.sh
./scripts/deploy_netlify.sh
```

Ce script tentera de compiler le CSS (`npm run build:css`) si Node est disponible, sinon il copiera `style.css` vers `dist/styles.css` en fallback, puis exécutera `npx netlify-cli deploy --dir=dist --prod`.

Déploiement automatique (GitHub Actions):

1. Dans votre dépôt GitHub, allez dans Settings → Secrets and variables → Actions et ajoutez:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`

2. Poussez sur `main`; le workflow `.github/workflows/deploy_netlify.yml` s'exécutera et déployera automatiquement.

Remarques:
- Ne partagez jamais `NETLIFY_AUTH_TOKEN` en clair.
- Si vous souhaitez self-héberger les polices, suivez `README-tw-build.md` avant de déployer pour pouvoir durcir la Content-Security-Policy.
