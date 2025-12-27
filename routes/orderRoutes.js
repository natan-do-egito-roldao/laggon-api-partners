const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
//router.get('/:id', orderController.getOrderById);
//router.put('/:id', orderController.updateOrder);
//router.delete('/:id', orderController.deleteOrder);

router.post("/a", (req, res) => {
  console.log("BODY:", req.body);
  res.status(201).json({ ok: true });
});


module.exports = router;