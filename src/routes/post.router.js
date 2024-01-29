const express = require('express');
const { postController } = require('../controllers');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, postController.createPost);

module.exports = router;