const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./app/routes/auth'); // Importer les routes d'authentification

const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

// Appel de la fonction de connexion à MongoDB
connectDB();

// Routes d'authentification (Signup et Login)
app.use('/api/auth', authRoutes);

// Démarre le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});