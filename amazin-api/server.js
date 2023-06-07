const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const morgan = require('morgan');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2022-11-15',
// });

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://main--amazin-app.netlify.app/'],
  })
);
app.use(helmet());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// app.get('/config', (req, res) => {
//   res.send({
//     publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
//   });
// });

// app.get('/secret', async (req, res) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1099,
//       currency: 'cad',
//       payment_method_types: ["card"],
//     });
//     res.json({client_secret: paymentIntent.client_secret});
//     // res.send({
//     //   clientSecret: paymentIntent.client_secret,
//     // });
//   } catch (e) {
//     return res.status(400).send({
//       error: {
//         message: e.message,
//       },
//     });
//   }

// });

const departments = require('./routes/departments');
const categories = require('./routes/categories');
const products = require('./routes/products');
const orders = require('./routes/orders');
const reviews = require('./routes/reviews');
const users = require('./routes/users');
const seller = require('./routes/seller');
const payments = require('./routes/payments');

app.use('/api', departments);
app.use('/api', categories);
app.use('/api', products);
app.use('/api', orders);
app.use('/api', reviews);
app.use('/api', users);
app.use('/api', seller);
app.use('/api', payments);

app.listen(PORT, () => {
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
