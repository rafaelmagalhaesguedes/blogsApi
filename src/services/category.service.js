const { Op } = require('sequelize');
const { Category, PostCategory } = require('../models');

const createCategory = async (name) => {
  //
  if (!name) {
    return { status: 'INVALID_VALUE', data: { message: '"name" is required' } };
  }
  
  try {
    const category = await Category.create({ name });
    return { status: 'CREATED', data: category };
  } catch (error) {
    console.log(error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
  }
};

const createPostCategory = async (categoryIds, postId) => {
  //
  const categories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  if (categories.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Categories not found' } };
  }

  const postCategories = categories.map((category) => ({ postId, categoryId: category.id }));
  if (postCategories.length === 0) {
    return { status: 'INVALID_VALUE', data: { message: 'Invalid categoryIds' } };
  }

  try {
    await PostCategory.bulkCreate(postCategories);
    return { status: 'CREATED', data: postCategories };
  } catch (error) {
    console.log(error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
  }
};

const getAllCategories = async () => {
  //
  const categories = await Category.findAll();

  if (categories.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Categories not found' } };
  }
  
  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  createCategory,
  createPostCategory,
  getAllCategories,
};