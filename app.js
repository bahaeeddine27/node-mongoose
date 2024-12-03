const express = require('express');
require('./app/model/index.js');
const router = require('./app/routes/index.js');

const app = express();

app.use(express.json());
app.use("/api", router);

module.exports = app;

require('dotenv').config();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
