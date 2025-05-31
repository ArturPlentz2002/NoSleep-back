const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Olá! Seu backend Node.js simples está funcionando!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

