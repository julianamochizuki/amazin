const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
} = require("../controllers/categories.js");

router.get("/departments/:departmentId/categories", getAllCategories);
router.get("/departments/:departmentId/categories/:categoryId", getCategoryById);

module.exports = router;
