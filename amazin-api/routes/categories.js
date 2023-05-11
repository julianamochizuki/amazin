const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
} = require("../controllers/categories.js");

router.get("/categories", getAllCategories);
router.get("/categories/:categoryId", getCategoryById);

module.exports = router;
