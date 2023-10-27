
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // Porta alterada para 3000

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

const ipAddress = '172.16.31.43'; // Você pode deixar assim para escutar em todas as interfaces de rede
app.listen(port, ipAddress, () => {
  console.log(`Servidor rodando na porta ${port} e no endereço IP ${ipAddress}`);
});