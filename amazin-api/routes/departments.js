const express = require("express");
const router = express.Router();
const {
  getAllDepartments,
  getDepartmentById,
} = require("../controllers/departments.js");

router.get("/departments", getAllDepartments);
router.get("/departments/:departmentId", getDepartmentById);

module.exports = router;
