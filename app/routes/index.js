const express = require('express');
const router = express.Router();

router.get('/api', (req, res) => {
  res.send('This is an example route');
});

module.exports = router;
