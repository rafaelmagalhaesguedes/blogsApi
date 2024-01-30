const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../../models');
const { createPostCategory } = require('../category.service');

const create = async ({ title, content, categoryIds, userId }) => {
  const newPost = await BlogPost.create({ title, content, userId });
  await createPostCategory(categoryIds, newPost.id);
  return newPost;
};

const search = async (searchString) => {
  const postsFound = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchString}%` } },
        { content: { [Op.like]: `%${searchString}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return postsFound;
};

const findAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const findById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

module.exports = {
  create,
  search,
  findAll,
  findById,
};