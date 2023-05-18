const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  authenticateUser,
} = require('../controllers/users.js');

router.post('/login', authenticateUser);
router.post('/register', createUser);
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.patch('/users/:userId', updateUserById);
router.delete('/users/:userId', deleteUserById);

module.exports = router;
