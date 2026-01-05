const Order = require('../schemas/order');
const axios = require('axios');

exports.createOrder = async (req, res) => {
  console.log(req.body); // 👈 veja se chega
  try {
    const url = 'https://new-backend.botconversa.com.br/api/v1/webhooks-automation/catch/105669/U3RHJPkINbMo/'

    const {name, number, email, plan, about, correct} = req.body;

    const existingOrder = await Order.findOne({email, number, plan});

    if (existingOrder){
      return res.status(409).json();
    };

    const doubleExistingOrder = await Order.findOne({
      $or: [{email}, {number}, {plan}]
    });

    let saveOrder;

    const aboutSafe = about && about.trim() !== "" 
      ? about 
      : "não informado";

    if (doubleExistingOrder) {
      saveOrder = await Order.findByIdAndUpdate(
        doubleExistingOrder._id,
        {
          name,
          email,
          number,
          plan,
          about: aboutSafe,
          date: new Date(),
          correct
        },
        { new: true }
      );


    } else {
      saveOrder = await Order.create({
        name,
        email,
        number,
        plan,
        about,
        date: new Date(),
        correct: 'true'
      })
    };
    const payload = {
      name: saveOrder.name,
      email: saveOrder.email,
      phone: saveOrder.number, // ajuste para o campo que o BotConversa espera
      plan: saveOrder.plan,
      about: saveOrder.about,
      correct: String(saveOrder.correct)
    };
    console.log(payload)

    axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
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