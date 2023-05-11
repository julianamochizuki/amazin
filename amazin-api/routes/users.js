const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserIdByEmail,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/users.js");

router.get("/users", getAllUsers);
router.get("/user/:userId", getUserIdByEmail);
router.post("/users", createUser);
router.patch("/users/:userId", updateUserById);
router.delete("/users/:userId", deleteUserById);

module.exports = router;
