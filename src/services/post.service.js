const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory } = require('../models');
const { postValidate } = require('./validations');

const createPostCategory = async (categoryIds, postId) => {
  const categories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });

  const newPostCategories = categories.map((categorie) => ({ postId, categoryId: categorie.id }));

  await PostCategory.bulkCreate(newPostCategories);
};

const createPost = async ({ title, content, categoryIds }, userId) => {
  postValidate.validatePostBody({ title, content, categoryIds });

  await postValidate.validateCategory(categoryIds);

  const newPost = await BlogPost.create({ title, content, userId });

  await createPostCategory(categoryIds, newPost.id);

  return { status: 'CREATED', data: newPost };
};

module.exports = {
  createPost,
};