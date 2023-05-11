const express = require("express");
const router = express.Router();
const {
  getAllOrdersByUserId,
  getOrderById,
  createOrder,
} = require("../controllers/orders.js");

router.get("/users/:userId/orders", getAllOrdersByUserId);
router.get("/users/:userId/orders/:orderId", getOrderById);
router.post("/users/:userId/orders", createOrder);

module.exports = router;
