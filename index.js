const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");

const app = express();

/**
 * 🔥 CORS DEFINITIVO (browser-safe)
 * Funciona para GET, POST, OPTIONS
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/**
 * Body parser
 */
app.use(express.json());

/**
 * Rotas
 */
app.use("/api/orders", orderRoutes);

/**
 * MongoDB
 */
mongoose.connect(process.env.ACESS)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Erro MongoDB:", err));

/**
 * Server
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
