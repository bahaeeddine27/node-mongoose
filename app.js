require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./app/routes/auth');

const app = express();

// Middleware pour le parsing JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connecté'))
  .catch((error) => console.log('Erreur de connexion à MongoDB:', error));

// Utiliser les routes d'authentification
app.use('/api/auth', authRoutes);

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
