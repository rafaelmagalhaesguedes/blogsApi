const { User, BlogPost, PostCategory } = require('../models');
const { createToken } = require('../utils/auth');
const { httpError } = require('../utils/httpErrors');
const { validateUserBody, validateUserByEmail } = require('./validations/user.validate');

const createUser = async ({ displayName, email, password, image }) => {
  validateUserBody(displayName, email, password, image);
  await validateUserByEmail(email);

  const user = await User.create({ displayName, email, password, image });
  const token = createToken({ id: user.id });

  return { status: 'CREATED', data: { token } };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { status: 'SUCCESSFUL', data: users };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!user) throw httpError('User does not exist', 404);

  return { status: 'SUCCESSFUL', data: user };
};

const deleteUser = async (id, email) => {
  // Get the user's blog posts
  const blogPosts = await BlogPost.findAll({ where: { userId: id } });

  // Delete the categories of each blog post
  await Promise.all(blogPosts.map((post) => PostCategory.destroy({ where: { postId: post.id } })));

  // Delete the user's blog posts
  await BlogPost.destroy({ where: { userId: id } });

  // Delete the user
  await User.destroy({ where: { email } });

  return { status: 'NO_CONTENT', data: null };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
