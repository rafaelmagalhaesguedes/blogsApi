const express = require('express');
const { postController } = require('../controllers');
const { authenticate } = require('../middleware/auth.middleware');
const { validatePost } = require('../middleware/post.middleware');

const router = express.Router();

// Route to create a new post
router.post('/', validatePost, authenticate, postController.createPost);

// Route to get all posts
router.get('/', authenticate, postController.getAllPosts);

// Route to search posts
router.get('/search', authenticate, postController.searchPosts);

// Route to get all posts by user id
router.get('/user/:id', authenticate, postController.getPostsByUserId);

// Route to get a post by id
router.get('/:id', authenticate, postController.getPostById);

// Route to update a post
router.put('/:id', validatePost, authenticate, postController.updatePost);

// Route to delete a post
router.delete('/:id', authenticate, postController.deletePost);

module.exports = router;