const express = require('express');
const { postController } = require('../controllers');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Route to create a new post
router.post('/', authenticate, postController.createPost);

// Route to get all posts
router.get('/', authenticate, postController.getAllPosts);

// Route to get a post by id
router.get('/:id', authenticate, postController.getPostById);

// Route to update a post
router.put('/:id', authenticate, postController.updatePost);

module.exports = router;