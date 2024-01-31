const { User, BlogPost, PostCategory } = require('../../models');
const { createToken } = require('../../utils/auth');

const create = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });
  const token = createToken({ id: user.id });
  return token;
};

const findAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const findById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return user;
};

const destroy = async (id, email) => {
  // Get the user's blog posts
  const blogPosts = await BlogPost.findAll({ where: { userId: id } });

  // Delete the categories of each blog post
  await Promise.all(blogPosts.map((post) => PostCategory.destroy({ where: { postId: post.id } })));

  // Delete the user's blog posts
  await BlogPost.destroy({ where: { userId: id } });

  // Delete the user
  await User.destroy({ where: { email } });
};

module.exports = { create, findAll, findById, destroy };