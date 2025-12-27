const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

// ✅ CORS (Express 4 funciona perfeitamente)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/orders", orderRoutes);

mongoose.connect(process.env.ACESS)
  .then(() => console.log("MongoDB conectado"))
  .catch(console.error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
