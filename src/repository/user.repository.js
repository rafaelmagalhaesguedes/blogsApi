const { User, BlogPost, PostCategory } = require('../models');
const { createToken } = require('../utils/auth');

const create = async ({ displayName, email, password, image }) => {
  //
  const user = await User.create({ displayName, email, password, image });
  const token = createToken({ id: user.id });

  return token;
};

const findAll = async () => {
  //
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const findById = async (id) => {
  //
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  return user;
};

const destroy = async (id, email) => {
  //
  const blogPosts = await BlogPost.findAll({ where: { userId: id } });

  if (!blogPosts) return null;

  try {
    await Promise.all(blogPosts.map((post) =>
      PostCategory.destroy({ where: { postId: post.id } })));
    await BlogPost.destroy({ where: { userId: id } });
    await User.destroy({ where: { email } });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { create, findAll, findById, destroy };