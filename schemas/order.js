const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  origin: String,
  number: String,
  email: String,
  plan: String, 
  date: String,
  about: String,
  correct: {type: Boolean, default: false}
});

orderSchema.index({ email: 1 });
orderSchema.index({ number: 1 });
orderSchema.index({ plan: 1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;