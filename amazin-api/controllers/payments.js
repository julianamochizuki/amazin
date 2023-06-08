require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const chargeCustomer = async (req, res) => {
  const { amount, currency, paymentMethod } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethod.id,
      confirm: false,
    });
    console.log(paymentIntent.client_secret);
    res.json(paymentIntent.client_secret);
  } catch (error) {
    throw new Error('Payment intent error: ' + error.message);
  }
};

module.exports = {
  chargeCustomer,
};
