# MaVille - PWA Civique

Une Progressive Web App (PWA) moderne pour la participation citoyenne en Côte d'Ivoire avec design professionnel et fonctionnalités avancées.

## ✨ Fonctionnalités

### 🏠 Accueil
- **Quick Actions** : Accès rapide aux fonctionnalités principales
- **Statistiques** : Tableaux de bord avec métriques clés
- **Flux d'actualités** : Articles locaux avec animations au scroll
- **Navigation fluide** : Transitions entre sections optimisées

### 🗳️ Avis (Sondages)
- **Sondages actifs** : Interface interactive avec vote en temps réel
- **Résultats détaillés** : Graphiques animés et statistiques complètes
- **Filtres avancés** : Recherche et tri des sondages
- **Historique** : Votes précédents sauvegardés localement

### 🚨 Signaler
- **Formulaire intelligent** : Validation en temps réel et feedback utilisateur
- **Types de problèmes** : Catégorisation visuelle avec icônes
- **Géolocalisation** : Position automatique ou saisie manuelle
- **Upload de photos** : Interface drag & drop avec aperçu
- **Niveaux d'urgence** : Système de priorité coloré
- **Suivi des signalements** : Numéros de référence et historique

### 🗺️ Proximité
- **Services filtrables** : 7 catégories (Urgence, Santé, Sécurité, Éducation, Commerce, Transport)
- **Carte interactive** : Géolocalisation des services (interface préparée)
- **Informations détaillées** : Horaires, coordonnées, statuts en temps réel
- **Actions rapides** : Appels directs et itinéraires

### 👤 Moi (Espace Personnel)
- **Profil enrichi** : Photo, statistiques et niveau de citoyenneté
- **Tableaux de bord** : Métriques personnelles (votes, signalements, points)
- **Historique d'activité** : Timeline des actions récentes
- **Menu paramètres** : Notifications, aide, à propos
- **Système de points** : Gamification de la participation citoyenne

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+)
- **PWA** : Service Worker, Manifest, Geolocation, Notifications
- **Stockage** : localStorage pour données utilisateur
- **Animations** : CSS Transitions, Intersection Observer
- **UI/UX** : Material Design Icons, thème sombre/clair
- **Performance** : Lazy loading, mise en cache intelligente

## 🚀 Déploiement sur Netlify

### Prérequis
- Repository Git (GitHub, GitLab, etc.)
- Compte Netlify gratuit

### Étapes de déploiement
1. **Push du code** : Commiter tous les fichiers dans votre repository
2. **Connexion Netlify** : Se connecter à netlify.com
3. **Nouveau site** : "Add new site" → "Import an existing project"
4. **Configuration** :
   - Branch to deploy: `main` (ou votre branche principale)
   - Build command: (laisser vide - site statique)
   - Publish directory: `/` (racine du projet)
5. **Déploiement** : Netlify déploie automatiquement
6. **Installation PWA** : Sur mobile, ajouter à l'écran d'accueil

### URL personnalisée (optionnel)
- Dans les paramètres du site Netlify
- Ajouter un domaine personnalisé si souhaité

## 📱 Fonctionnalités PWA

- **Installation** : S'installe comme une app native
- **Hors ligne** : Fonctionne sans connexion (contenu mis en cache)
- **Notifications** : Alertes pour nouveaux sondages/signalements
- **Mise à jour automatique** : Versions mises à jour en arrière-plan

## 🎨 Améliorations récentes

- ✅ **Design professionnel** : Interface moderne et cohérente
- ✅ **Animations fluides** : Transitions et micro-interactions
- ✅ **Formulaires intelligents** : Validation et feedback en temps réel
- ✅ **Géolocalisation intégrée** : Position automatique pour signalements
- ✅ **Système de catégories** : Filtrage avancé des services
- ✅ **Thème sombre/clair** : Sauvegarde automatique des préférences
- ✅ **Navigation tactile** : Swipe pour naviguer entre sections
- ✅ **Stockage local** : Données persistantes hors ligne
- ✅ **Performance optimisée** : Chargement rapide et fluide
- ✅ **Accessibilité** : Support des lecteurs d'écran et navigation clavier

## 📊 Métriques et Analytics

L'application inclut des métriques préparées pour :
- Taux d'engagement utilisateur
- Fréquence d'utilisation des fonctionnalités
- Taux de conversion des signalements
- Satisfaction utilisateur (sondages intégrés)

## 🔧 Développement local

```bash
# Cloner le repository
git clone [votre-repo-url]
cd maville-pwa

# Ouvrir dans un serveur local
python -m http.server 8000
# ou
npx serve .

# Accéder à http://localhost:8000
```

## 📝 Structure du projet

```
maville-pwa/
├── index.html          # Application principale
├── style.css           # Styles et animations
├── script.js           # Logique JavaScript
├── manifest.json       # Configuration PWA
├── sw.js              # Service Worker
├── README.md          # Documentation
└── [dossiers originaux]/ # Contenu de référence
```

## 🤝 Contribution

Ce projet est open source et les contributions sont bienvenues pour :
- Améliorer l'interface utilisateur
- Ajouter de nouvelles fonctionnalités
- Optimiser les performances
- Corriger des bugs
- Traduire dans d'autres langues

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

**MaVille** - Participez à la vie de votre ville ! 🇨🇮