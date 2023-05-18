const express = require('express');
const router = express.Router();
const {
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  authenticateUser,
} = require('../controllers/users.js');
const authenticateToken = require('../helpers/authToken.js');

router.post('/login', authenticateUser);
router.post('/register', createUser);
router.get('/users/:userId', authenticateToken, getUserById);
router.patch('/users/:userId', authenticateToken, updateUserById);
router.delete('/users/:userId', authenticateToken, deleteUserById);

module.exports = router;
