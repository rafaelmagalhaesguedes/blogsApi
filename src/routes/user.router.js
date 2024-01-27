const express = require('express');
const { userController } = require('../controllers');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/', userController.createUser);

router.get('/', authenticate, userController.getAllUsers);

module.exports = router;