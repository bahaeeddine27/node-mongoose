const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connexion à MongoDB avec Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);  // Quitte le processus si la connexion échoue
  }
};

// Appel de la fonction de connexion à MongoDB
connectDB();

// Définir une route pour la racine "/"
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Démarre le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
