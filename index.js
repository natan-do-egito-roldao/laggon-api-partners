const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

// Rotas
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());


// Middleware
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose.connect(process.env.ACESS)
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch(err => console.error('Erro ao conectar MongoDB:', err));

// Rotas
app.use('/api/orders', orderRoutes);

// Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
