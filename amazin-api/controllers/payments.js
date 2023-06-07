const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const chargeCustomer = async (amount, currency, paymentMethod) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethod.id,
      confirm: false,
    });
    return paymentIntent.client_secret;
  } catch (error) {
    throw new Error('Payment intent error: ' + error.message);
  }
};


module.exports = {
  chargeCustomer,
};
