const express = require('express');
const router = express.Router();
const {
  getAllOrdersByUserId,
  createOrder,
} = require('../controllers/orders.js');
userId = require('../helpers/users');

router.get('/users/:userId/orders', getAllOrdersByUserId);
router.post('/users/:userId/orders', createOrder);

module.exports = router;
