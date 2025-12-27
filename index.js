const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const orderRoutes = require('./routes/orderRoutes');

const app = express();

// ✅ CORS PRIMEIRO
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ depois JSON
app.use(express.json());

// Rotas
app.use('/api/orders', orderRoutes);

// Mongo
mongoose.connect(process.env.ACESS)
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch(err => console.error('Erro ao conectar MongoDB:', err));

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
