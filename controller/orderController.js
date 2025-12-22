const Order = require('../schemas/order');
const axios = require('axios');

exports.createOrder = async (req, res) => {
  try {
    const url = 'https://new-backend.botconversa.com.br/api/v1/webhooks-automation/catch/105669/bJlVDnVe69Xb/'

    const {name, number, email, plan, about, origin} = req.body;

    const existingOrder = await Order.findOne({email, number, plan});

    if (existingOrder){
      return res.status(409).json();
    };

    const doubleExistingOrder = await Order.findOne({
      $or: [{email}, {number}, {plan}]
    });

    let saveOrder;

    if (doubleExistingOrder) {
      const updateOrder = await Order.findByIdAndUpdate(
        doubleExistingOrder._id,
        {
          name,
          email,
          number,
          plan,
          about,
          origin,
          date: new Date()
        },
        {
          new: true
        }
      );

    } else {
      saveOrder = await Order.create({
        name,
        email,
        number,
        plan,
        about,
        origin,
        date: new Date(),
        correct: true
      })
    };

    const payload = saveOrder;

    axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Webhook enviado com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao enviar webhook:', error.response?.data || error.message);
    });
    return res.status(200).json();

  } catch (err) {
    return res.status(400).json(err.message);
  }
};

exports.getOrders = async (req, res) => {
  try{
    const orders = await Order.find()

    return res.status(200).json(orders);

  } catch (erro) {
    return res.status(400).json();
  };
};