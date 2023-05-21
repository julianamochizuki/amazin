const express = require('express');
const router = express.Router();
const {
  getAllSellerProducts,
  getAllSellerOrders,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require('../controllers/seller.js');
const authenticateToken = require('../helpers/authToken');
const { route } = require('./departments.js');

/* admin products */
router.get(
  '/seller/:sellerId/inventory',
  authenticateToken,
  getAllSellerProducts
);

router.get(
  '/seller/:sellerId/orders',
  authenticateToken,
  getAllSellerOrders
);

router.get(
  '/seller/:sellerId/inventory/:productId',
  authenticateToken,
  getProductById
);

router.post('/seller/:sellerId/inventory', authenticateToken, createProduct);
router.patch(
  '/seller/:sellerId/inventory/:productId',
  authenticateToken,
  updateProductById
);
router.delete(
  '/seller/:sellerId/inventory/:productId',
  authenticateToken,
  deleteProductById
);

module.exports = router;
