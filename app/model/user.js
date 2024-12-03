const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // L'email doit être unique
    match: [/\S+@\S+\.\S+/, 'Veuillez entrer un email valide']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

// Appliquer le middleware uniqueValidator
userSchema.plugin(uniqueValidator);

// Middleware pour hacher le mot de passe avant de sauvegarder
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Comparer le mot de passe lors de la connexion
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
