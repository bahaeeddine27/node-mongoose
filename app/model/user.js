const mongoose = require('mongoose');

// Schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Créer le modèle utilisateur
const User = mongoose.model('User', userSchema);

module.exports = User;
