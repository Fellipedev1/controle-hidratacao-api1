const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let registrosDeHidratacao = [];

app.get('/registros', (req, res) => {
  res.json(registrosDeHidratacao);
});

app.post('/registros', (req, res) => {
  const novoRegistro = req.body;
  registrosDeHidratacao.push(novoRegistro);
  res.json(novoRegistro);
});

module.exports = app;
