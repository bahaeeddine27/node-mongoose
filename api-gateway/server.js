const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

// Redirection des requêtes d'authentification
app.use('/api/auth', proxy('http://localhost:3000'));

// Démarrage de l'API Gateway
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Gateway en cours d'exécution sur le port ${PORT}`);
});
