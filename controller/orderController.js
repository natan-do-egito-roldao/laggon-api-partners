const Order = require('../schemas/order');
const axios = require('axios');

exports.createOrder = async (req, res) => {
  try {
    const url = 'https://new-backend.botconversa.com.br/api/v1/webhooks-automation/catch/105669/rECYcMmhelvo/';

    const { name, number, email, plan, about } = req.body;
    let phone = String(number).trim();
    if (!phone.startsWith("55")) {
        phone = "55" + phone
    }
    console.log(phone)

    const aboutSafe = about?.trim() || 'não informado';

    // 🔑 identidade da pessoa
    const existingContact = await Order.findOne({
      $or: [{ email }, { number }]
    });

    let saveOrder;

    if (existingContact) {
      // 🔁 atualização
      saveOrder = await Order.findByIdAndUpdate(
        existingContact._id,
        {
          name,
          email,
          number: phone,
          plan,
          about: aboutSafe,
          date: new Date(),
          correct: true
        },
        { new: true }
      );
    } else {
      // 🆕 criação
      saveOrder = await Order.create({
        name,
        email,
        number: phone,
        plan,
        about: aboutSafe,
        date: new Date(),
        correct: false
      });
    }

    const payload = {
      name: saveOrder.name,
      email: saveOrder.email,
      phone: saveOrder.number,
      plan: saveOrder.plan,
      about: saveOrder.about,
      correct: saveOrder.correct // boolean
    };

    console.log('payload enviado:', payload);

    await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (erro) {
    return res.status(400).json();
  }
};
