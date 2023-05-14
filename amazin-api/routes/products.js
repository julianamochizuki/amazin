const express = require("express");
const router = express.Router();
const {isAdmin }= require("../helpers/users");
const {
  getAllProducts,
  getAllProductsByCategory,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/products.js");

router.get("/categories/:categoryId/products", getAllProductsByCategory);
router.get("/products/:productId", getProductById);
router.post("/categories/:categoryId/products", isAdmin, createProduct);
router.patch(
  "/categories/:categoryId/products/:productId",
  isAdmin,
  updateProductById
);
router.delete(
  "/categories/:categoryId/products/:productId",
  isAdmin,
  deleteProductById
);

module.exports = router;
