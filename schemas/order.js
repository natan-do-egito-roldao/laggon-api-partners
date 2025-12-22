const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  origin: String,
  number: Number,
  email: String,
  plan: String, 
  date: String,
  about: String
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;