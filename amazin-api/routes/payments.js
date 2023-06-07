const express = require('express');
const { chargeCustomer } = require('../controllers/payments');
const authenticateToken = require('../helpers/authToken');
const router = express.Router();

router.post('/payments', authenticateToken, chargeCustomer);

module.exports = router;
