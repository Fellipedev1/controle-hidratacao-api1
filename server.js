const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; // Alterado para usar a variável de ambiente PORT ou 3000 se não estiver definida

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

const ipAddress = '0.0.0.0'; // Escuta em todas as interfaces de rede
app.listen(port, ipAddress, () => {
  console.log(`Servidor rodando na porta ${port} e no endereço IP ${ipAddress}`);
});
