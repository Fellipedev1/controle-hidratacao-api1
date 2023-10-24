const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Habilita o CORS para todas as rotas

let registrosDeHidratacao = [];

// Rota para obter todos os registros de hidratação
app.get('/registros', (req, res) => {
  res.json(registrosDeHidratacao);
});

// Rota para adicionar um novo registro de hidratação
app.post('/registros', (req, res) => {
  const novoRegistro = req.body;
  registrosDeHidratacao.push(novoRegistro);
  res.json(novoRegistro);
});

const ipAddress = '172.16.31.43'; // Substitua 'SEU_ENDERECO_IP_LOCAL' pelo seu endereço IP local
app.listen(port, ipAddress, () => {
  console.log(`Servidor rodando na porta ${port} e no endereço IP ${ipAddress}`);
});
