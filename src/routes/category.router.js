const express = require('express');
const { categoryController } = require('../controllers');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Route to create a new category
router.post('/', authenticate, categoryController.createCategory);

module.exports = router;