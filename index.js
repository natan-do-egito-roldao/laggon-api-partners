const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

// 1️⃣ CORS base
app.use(cors({ origin: "*" }));

// 2️⃣ PRE-FLIGHT FIX (Express 5 🔥)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(204);
  }
  next();
});

// 3️⃣ Body parser
app.use(express.json());

// 4️⃣ Rotas
app.use("/api/orders", orderRoutes);

// Mongo
mongoose.connect(process.env.ACESS)
  .then(() => console.log("MongoDB conectado"))
  .catch(console.error);

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
