const express = require("express");
const router = express.Router();
const {
  getAllLineItems,
  getLineItemById,
  createLineItem,
  updateLineItemById,
  deleteLineItemById,
} = require("../controllers/lineItems.js");

router.get("/lineItems", getAllLineItems);
router.get("/lineItems/:lineItemId", getLineItemById);
router.post("/lineItems", createLineItem);
router.patch("/lineItems/:lineItemId", updateLineItemById);
router.delete("/lineItems/:lineItemId", deleteLineItemById);

module.exports = router;
