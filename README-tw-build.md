Build Tailwind et self-host fonts

1) Installer les dépendances (Node.js >= 16 requis)

```bash
npm install
```

2) Compiler le CSS Tailwind en production

```bash
npm run build:css
```

Le résultat sera écrit dans `dist/styles.css`.

3) Self-host des polices Google

- Télécharger les fichiers `.woff2`/`.woff` nécessaires depuis Google Fonts (ou via un outil comme `google-webfonts-helper`) et placer les fichiers dans `assets/fonts/`.
- Ajouter une règle `@font-face` dans `dist/styles.css` (ou un fichier CSS séparé) pointant vers `assets/fonts/*.woff2`.

Pourquoi : compilation locale permet de purger les classes inutilisées (tailwind purge), réduire la taille CSS, et retirer la dépendance au CDN pour pouvoir appliquer une CSP stricte (sans `unsafe-inline` ni dépendances externes).
