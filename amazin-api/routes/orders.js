const express = require("express");
const router = express.Router();
const {
  getAllOrdersByUserId,
  getOrderById,
  createOrder,
} = require("../controllers/orders.js");
userId = require("../helpers/users");

router.get("/orders", getAllOrdersByUserId);
router.get("/orders/:orderId", getOrderById);
router.post("/orders", createOrder);

module.exports = router;
