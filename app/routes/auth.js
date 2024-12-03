const express = require('express');
const User = require('../model/user'); // Importer le modèle User
const router = express.Router();

// Route Signup (Inscription)
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Utilisateur déjà existant' });
  }

  // Créer un nouvel utilisateur
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route Login (Connexion)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'utilisateur existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Utilisateur non trouvé' });
  }

  // Vérifier le mot de passe
  if (user.password !== password) {
    return res.status(400).json({ message: 'Mot de passe incorrect' });
  }

  res.status(200).json({ message: 'Connexion réussie', user });
});

module.exports = router;
