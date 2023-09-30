const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 7777;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/checkout', (req, res) => {
  const { cart, customerInfo } = req.body;

  setTimeout(() => {
    res.status(200).json({ status: 'Em análise' });
  }, 2000);
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
