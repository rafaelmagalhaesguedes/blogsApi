const express = require('express');
const { loginController } = require('../controllers');
const loginMiddleware = require('../middleware/login.middleware');

const router = express.Router();

// Login route
router.post('/', loginMiddleware.validateLogin, loginController.loginUser);

module.exports = router;