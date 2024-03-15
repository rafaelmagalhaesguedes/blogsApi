//
// Barrel Repository
const postRepository = require('./post.repository');
const userRepository = require('./user.repository');
const categoryRepository = require('./category.repository');
const blogRepository = require('./blogpost.repository');

module.exports = {
  postRepository,
  userRepository,
  categoryRepository,
  blogRepository,
};