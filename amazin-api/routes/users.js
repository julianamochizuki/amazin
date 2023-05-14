const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserIdByEmail,
  createUser,
  updateUserById,
  deleteUserById,
} = require('../controllers/users.js');

router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.get('/user/', getUserIdByEmail);
router.post('/users', createUser);
router.patch('/users/:userId', updateUserById);
router.delete('/users/:userId', deleteUserById);

module.exports = router;
