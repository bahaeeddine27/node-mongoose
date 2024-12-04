const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Convertit l'email en minuscules avant de l'enregistrer
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Appliquer le validateur unique pour l'email
userSchema.plugin(uniqueValidator, { message: '{PATH} déjà utilisé' });

// Middleware pour hasher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Si le mot de passe n'est pas modifié, ne rien faire
  try {
    const salt = await bcrypt.genSalt(10); // Générer un sel
    this.password = await bcrypt.hash(this.password, salt); // Hacher le mot de passe
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
