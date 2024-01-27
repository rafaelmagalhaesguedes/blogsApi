const express = require('express');
const { userController } = require('../controllers');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Route to create a new user
router.post('/', userController.createUser);

// Route to get all users
router.get('/', authenticate, userController.getAllUsers);

// Route to get user by id
router.get('/:id', authenticate, userController.getUserById);

module.exports = router;