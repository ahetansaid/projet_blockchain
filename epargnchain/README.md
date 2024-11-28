# EpargnChain

EpargnChain est une application de gestion d'épargne utilisant la blockchain pour sécuriser les transactions.

## Structure du Projet

```
epargnchain/
├── frontend/    # Application React
└── backend/     # API Node.js
```

## Frontend

### Technologies Utilisées
- React.js
- Redux pour la gestion d'état
- Material-UI pour l'interface utilisateur
- Web3.js pour l'interaction avec la blockchain

### Installation

```bash
cd frontend
npm install
```

### Démarrage

```bash
npm start
```
L'application sera accessible sur http://localhost:3000

### Scripts Disponibles

- `npm start` : Lance l'application en mode développement
- `npm test` : Exécute les tests
- `npm run build` : Crée la version de production
- `npm run lint` : Vérifie le code avec ESLint

## Backend

### Technologies Utilisées
- Node.js
- Express.js
- MongoDB
- Smart Contracts (Solidity)

### Installation

```bash
cd backend
npm install
```

### Configuration

Créez un fichier `.env` à la racine du dossier backend :

```env
PORT=5000
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
BLOCKCHAIN_NETWORK=votre_réseau_blockchain
```

### Démarrage

```bash
npm run dev     # Mode développement
npm start       # Mode production
```

Le serveur sera accessible sur http://localhost:5000

### API Endpoints

#### Authentification
- POST `/api/auth/register` : Inscription
- POST `/api/auth/login` : Connexion

#### Transactions
- GET `/api/transactions` : Liste des transactions
- POST `/api/transactions` : Nouvelle transaction
- GET `/api/transactions/:id` : Détails d'une transaction

## Smart Contracts

Les smart contracts sont situés dans `backend/contracts/`

### Déploiement

```bash
cd backend
npx hardhat compile
npx hardhat deploy --network <nom_du_réseau>
```

## Tests

### Frontend
```bash
cd frontend
```

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
