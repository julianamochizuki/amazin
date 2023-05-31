const express = require('express');
const router = express.Router();
const {
  getAllOrdersByUserId,
  createOrder,
} = require('../controllers/orders.js');
const authenticateToken = require('../helpers/authToken.js');

router.get('/users/:userId/orders', authenticateToken, getAllOrdersByUserId);
router.post('/users/:userId/orders', authenticateToken, createOrder);

module.exports = router;
