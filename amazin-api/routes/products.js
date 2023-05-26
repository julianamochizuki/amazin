const express = require('express');
const router = express.Router();
const { isAdmin } = require('../helpers/users');
const {
  getAllProducts,
  getAllProductsByCategory,
  getAllProductsBySearch,
  getAllProductsByFilter,
  getAllDealsProducts,
  getProductById,
  updateProductById,
} = require('../controllers/products.js');
const authenticateToken = require('../helpers/authToken');

router.get('/categories/:categoryId/products', getAllProductsByCategory);
router.get('/products/search', getAllProductsBySearch);
router.get('/categories/:categoryId/products/filter', getAllProductsByFilter);
router.get('/products/deals', getAllDealsProducts);
router.get('/products/:productId', getProductById);
router.patch('/products/:productId', authenticateToken, updateProductById);

module.exports = router;
