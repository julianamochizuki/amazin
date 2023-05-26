const express = require('express');
const router = express.Router();
const { isAdmin } = require('../helpers/users');
const {
  getAllProductsByDepartment,
  getAllProductsByCategory,
  getAllProductsBySearch,
  getAllProductsByFilter,
  getAllDealsProducts,
  getProductById,
  updateProductById,
  getBestSellersProducts,
} = require('../controllers/products.js');
const authenticateToken = require('../helpers/authToken');

router.get('/departments/:departmentId/products', getAllProductsByDepartment);
router.get('/categories/:categoryId/products', getAllProductsByCategory);
router.get('/categories/:categoryId/products/filter', getAllProductsByFilter);
router.get('/products/search', getAllProductsBySearch);
router.get('/products/deals', getAllDealsProducts)
router.get('/products/bestsellers', getBestSellersProducts);
router.get('/products/:productId', getProductById);
router.patch('/products/:productId', authenticateToken, updateProductById);

module.exports = router;
