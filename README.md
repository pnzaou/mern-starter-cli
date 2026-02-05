# 🚀 MERN Starter CLI

Un CLI puissant pour générer instantanément un projet **MERN Stack** (MongoDB, Express, React, Node.js) complet avec authentification, design moderne et toutes les bonnes pratiques intégrées.

Arrêtez de perdre des heures à reconfigurer la même architecture ! Lancez votre projet en 2 minutes chrono. ⚡

[![npm version](https://img.shields.io/npm/v/mern-starter-cli.svg)](https://www.npmjs.com/package/mern-starter-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)](https://nodejs.org)

## ✨ Fonctionnalités

### 🔧 Backend (Node.js/Express)

- ✅ **Architecture MVC** avec DTOs (Data Transfer Objects)
- ✅ **Authentification complète** : Register, Login, Profil, Change Password
- ✅ **Mot de passe oublié** avec système de réinitialisation par email (Resend)
- ✅ **Sécurité renforcée** : Helmet, CORS, CSRF, JWT, bcryptjs
- ✅ **Base de données** : MongoDB + Mongoose
- ✅ **Validation** : express-validator pour toutes les entrées
- ✅ **Tests** : Jest + Supertest pré-configurés
- ✅ **Documentation** : Swagger UI automatique
- ✅ **Performance** : Morgan (logs) + Compression
- ✅ **Hot reload** : Nodemon configuré

### 🎨 Frontend (React + Vite)

- ✅ **Design moderne** : Tailwind CSS v4 + composants shadcn/ui
- ✅ **Pages complètes** : Login, Register, Dashboard, Profil, Forgot/Reset Password
- ✅ **State management** : Redux Toolkit
- ✅ **Formulaires** : React Hook Form + Yup (validation schemas)
- ✅ **Notifications** : React Hot Toast avec design élégant
- ✅ **Routing** : React Router avec routes protégées (Public/Private)
- ✅ **API Client** : Axios configuré avec intercepteurs JWT
- ✅ **Structure organisée** : Slices, Schemas, API services
- ✅ **Toutes les APIs** déjà connectées et fonctionnelles

## 📦 Installation
```bash
npm install -g mern-starter-cli
```

## 🚀 Utilisation
```bash
mern-starter-cli create
```

Le CLI vous demandera le nom de votre projet, puis :

1. ✅ Créera la structure complète (`client/` + `server/`)
2. ✅ Installera toutes les dépendances
3. ✅ Mettra à jour les packages vers les dernières versions avec `ncu`
4. ✅ Configurera Tailwind CSS v4 + shadcn/ui
5. ✅ Copiera tous les templates pré-configurés
6. ✅ Générera les fichiers `.env.example`

## 📁 Structure du projet généré
```
mon-projet/
├── client/                      # 🎨 Frontend React
│   ├── src/
│   │   ├── api/                # Services API
│   │   │   └── auth.js
│   │   ├── components/         # Composants UI (shadcn/ui)
│   │   │   └── ui/
│   │   ├── lib/                # Utilitaires
│   │   │   ├── axios.js        # Configuration Axios
│   │   │   └── utils.js
│   │   ├── pages/              # Pages de l'application
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── schemas/            # Schémas de validation Yup
│   │   │   ├── login.schema.js
│   │   │   ├── register.schema.js
│   │   │   └── ...
│   │   ├── slices/             # Redux slices
│   │   │   └── authSlice.js
│   │   ├── store/              # Redux store
│   │   │   └── store.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .npmrc                  # Configuration npm
│   ├── .env.example
│   ├── jsconfig.json           # Alias @ configuré
│   ├── vite.config.js
│   └── package.json
│
└── server/                      # 🔧 Backend Express
    ├── src/
    │   ├── config/             # Configuration
    │   │   └── database.js     # Connexion MongoDB
    │   ├── controllers/        # Contrôleurs
    │   │   └── auth.controller.js
    │   ├── dto/                # Data Transfer Objects
    │   │   └── auth.dto.js
    │   ├── middlewares/        # Middlewares
    │   │   └── auth.middleware.js
    │   ├── models/             # Modèles Mongoose
    │   │   └── User.js
    │   ├── routes/             # Routes API
    │   │   └── auth.routes.js
    │   ├── utils/              # Utilitaires
    │   │   └── email.js        # Service d'envoi d'emails
    │   └── server.js           # Point d'entrée
    ├── __tests__/              # Tests Jest
    │   └── auth.test.js
    ├── .env.example
    ├── .gitignore
    └── package.json
```

## 🔧 Configuration et démarrage

### 1️⃣ Backend
```bash
cd mon-projet/server

# Installer les dépendances (si pas déjà fait)
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# Démarrer le serveur de développement
npm run dev
```

**Variables d'environnement Backend (`.env`)** :
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern_app
JWT_SECRET=votre_secret_jwt_super_securise
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
RESEND_API_KEY=votre_cle_resend  # Optionnel : pour l'envoi d'emails
EMAIL_FROM=onboarding@resend.dev
```

### 2️⃣ Frontend
```bash
cd mon-projet/client

# Installer les dépendances (si pas déjà fait)
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env si nécessaire

# Démarrer le serveur de développement
npm run dev
```

**Variables d'environnement Frontend (`.env`)** :
```env
VITE_API_URL=http://localhost:5000/api
```

### 3️⃣ Accéder à l'application

- **Frontend** : [http://localhost:5173](http://localhost:5173)
- **Backend API** : [http://localhost:5000](http://localhost:5000)
- **Documentation API (Swagger)** : [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## 📚 Routes API disponibles

| Méthode | Route                       | Description                    | Auth requise |
|---------|-----------------------------|--------------------------------|--------------|
| POST    | `/api/auth/register`        | Créer un compte                | ❌           |
| POST    | `/api/auth/login`           | Se connecter                   | ❌           |
| GET     | `/api/auth/me`              | Obtenir le profil              | ✅           |
| PUT     | `/api/auth/profile`         | Mettre à jour le profil        | ✅           |
| PUT     | `/api/auth/change-password` | Changer le mot de passe        | ✅           |
| POST    | `/api/auth/forgot-password` | Demander réinitialisation      | ❌           |
| PUT     | `/api/auth/reset-password/:token` | Réinitialiser mot de passe | ❌       |

## 🧪 Tests
```bash
cd server

# Lancer les tests
npm test

# Tests avec couverture
npm run test:coverage
```

## 📦 Packages principaux inclus

### Backend

- **express** - Framework web
- **mongoose** - ODM MongoDB
- **bcryptjs** - Hachage de mots de passe
- **jsonwebtoken** - Gestion JWT
- **express-validator** - Validation des données
- **helmet** - Sécurité HTTP headers
- **cors** - Gestion CORS
- **morgan** - Logging HTTP
- **compression** - Compression gzip
- **resend** - Envoi d'emails
- **jest** + **supertest** - Tests
- **swagger-jsdoc** + **swagger-ui-express** - Documentation API

### Frontend

- **react** + **react-dom** - Framework UI
- **vite** - Build tool ultra-rapide
- **tailwindcss** - Framework CSS
- **shadcn/ui** - Composants UI modernes
- **react-router-dom** - Routing
- **@reduxjs/toolkit** - State management
- **react-redux** - Bindings Redux pour React
- **axios** - Client HTTP
- **react-hook-form** - Gestion de formulaires
- **yup** - Validation de schémas
- **react-hot-toast** - Notifications

## 🎯 Fonctionnalités clés

### 🔐 Authentification complète

- Inscription avec validation
- Connexion avec JWT
- Routes protégées
- Gestion du profil utilisateur
- Changement de mot de passe
- Réinitialisation par email

### 🎨 Design moderne

- Interface responsive (mobile-first)
- Composants shadcn/ui personnalisables
- Animations fluides
- Dark mode ready (Tailwind CSS)

### 🛡️ Sécurité

- Mots de passe hashés avec bcryptjs
- Tokens JWT sécurisés
- Protection CSRF
- Headers sécurisés avec Helmet
- Validation stricte des entrées

### ⚡ Performance

- Compression gzip
- Lazy loading des routes
- Optimisation Vite
- MongoDB indexé

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. 🍴 Fork le projet
2. 🌿 Créer une branche (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push vers la branche (`git push origin feature/AmazingFeature`)
5. 🔀 Ouvrir une Pull Request

## 🐛 Rapporter un bug

Ouvrez une [issue](https://github.com/pnzaou/mern-starter-cli/issues) avec :

- Description du problème
- Étapes pour reproduire
- Comportement attendu vs comportement actuel
- Captures d'écran si applicable

## 📄 Licence

MIT © [Perrin Emmanuel Nzaou](https://github.com/pnzaou)

## 👨‍💻 Auteur

**Perrin Emmanuel NZAOU** - Développeur Web Full-Stack

- LinkedIn : [Perrin Emmanuel Nzaou](https://www.linkedin.com/in/perrin-emmanuel-nzaou-37941b307)
- GitHub : [@pnzaou](https://github.com/pnzaou)
- Portfolio : [Perrin Emmanuel Nzaou](https://my-portfolio-c3df5.web.app/)

## ⭐ Support

Si ce projet vous aide, donnez-lui une ⭐ !

---

**Créé avec ❤️ pour la communauté des développeurs MERN**