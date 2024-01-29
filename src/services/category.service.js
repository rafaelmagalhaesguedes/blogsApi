const { Op } = require('sequelize');
const { Category, PostCategory } = require('../models');

const createCategory = async (name) => {
  if (!name) return { status: 'INVALID_VALUE', data: { message: '"name" is required' } };
  const category = await Category.create({ name });

  return { status: 'CREATED', data: category };
};

const createPostCategory = async (categoryIds, postId) => {
  const categories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  const newPostCategories = categories.map((categorie) => (
    { postId, categoryId: categorie.id }
  ));
  await PostCategory.bulkCreate(newPostCategories);
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  createCategory,
  createPostCategory,
  getAllCategories,
};