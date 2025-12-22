const Order = require('../schemas/order');
const axios = require('axios');

exports.createOrder = async (req, res) => {
  try {
    const url = 'https://new-backend.botconversa.com.br/api/v1/webhooks-automation/catch/105669/bJlVDnVe69Xb/'

    const {name, number, email, plan, about, origin} = req.body;

    const existingOrder = await Order.findOne({email, number, plan});

    console.log(existingOrder);

    if (existingOrder){
      return res.status(409).json();
    };

    const doubleExistingOrder = await Order.findOne({
      $or: [{email}, {number}, {plan}]
    });

    let saveOrder;

    if (doubleExistingOrder) {
      saveOrder = {
        name: name,
        origin: origin,
        number: number,
        email: email,
        plan: plan, 
        date: new Date(),
        about: about,
        correct: true
      };
    } else {
      saveOrder = {
        name: name,
        origin: origin,
        number: number,
        email: email, 
        plan: plan, 
        date: new Date(),
        about: about
      };
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

    await Order.findOneAndDelete({"correct": false});
    const passOrder = await Order.create(saveOrder);

    return res.status(200).json(payload);

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