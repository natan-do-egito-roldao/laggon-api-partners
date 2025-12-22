const Order = require('../schemas/order');
const axios = require('axios');

exports.createOrder = async (req, res) => {
  try {
    const url = 'https://new-backend.botconversa.com.br/api/v1/webhooks-automation/catch/105669/bJlVDnVe69Xb/'

    const name = req.body.name;
    const number = req.body.number;
    const email = req.body.email;
    const plan = req.body.plan;
    const about = req.body.about;
    const origin = req.body.origin;

    const newOrder = await Order.create({
      name: name,
      origin: origin,
      number: number,
      email: email,
      plan: plan, 
      date: new Date(),
      about: about
    });

    await newOrder.save();

    const payload = newOrder;

    axios.post(url, newOrder, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Webhook enviado com sucesso!');
      console.log(response.data);
    })
    .catch(error => {
      console.error('Erro ao enviar webhook:', error.response?.data || error.message);
    });

    res.status(200).json()

  } catch (error) {

    res.status(400).json(error);

  }
};

exports.getOrders = async (req, res) => {
  try{
    const orders = await Order.find()

    res.status(200).json(orders)

  } catch (erro) {

  };
};