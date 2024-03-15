const express = require('express');
const { loginController } = require('../controllers');
const { validateLogin } = require('../middleware/login.middleware');

const router = express.Router();

// Login route
router.post('/', validateLogin, loginController.loginUser);

module.exports = router;