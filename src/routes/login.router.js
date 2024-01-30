const express = require('express');
const { loginController } = require('../controllers');

const router = express.Router();

// Login route
router.post('/', loginController.loginUser);

module.exports = router;