const express = require('express');
const router = express.Router();
const { isAdmin } = require('../helpers/users');
const {
  getAllProducts,
  getAllProductsByCategory,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require('../controllers/products.js');
const authenticateToken = require('../helpers/authToken');

router.get('/categories/:categoryId/products', getAllProductsByCategory);
router.get('/products/:productId', getProductById);
router.patch('/products/:productId', authenticateToken, updateProductById);

/* admin products */
router.get('/users/:userId/products', isAdmin, createProduct);
router.post('/users/:userId/products', isAdmin, createProduct);
router.patch('/users/:userId/products/:productId', isAdmin, updateProductById);
router.delete(
  '/users/:userId/products/products/:productId',
  isAdmin,
  deleteProductById
);

module.exports = router;
