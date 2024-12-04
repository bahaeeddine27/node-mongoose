require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./app/routes/auth');

const app = express();

// Vérification des variables d'environnement nécessaires
if (!process.env.DB_URI) {
  console.error('Erreur : La variable d\'environnement DB_URI est manquante.');
  process.exit(1);
}

// Middleware pour le parsing JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1);
  });

// Utiliser les routes d'authentification
app.use('/', authRoutes);

// Démarrer le serveur
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Serveur Auth en cours d'exécution sur le port ${port}`));
