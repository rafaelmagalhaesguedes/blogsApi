const { Op } = require('sequelize');
const { Category, PostCategory } = require('../models');

const create = async (name) => {
  //
  const category = await Category.create({ name });
  return category;
};

const createPostCategory = async (categoryIds, postId) => {
  //
  try {
    const categories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
    const postCategories = categories.map((category) => ({ postId, categoryId: category.id }));
    await PostCategory.bulkCreate(postCategories);
  } catch (error) {
    console.log(error.message);
  }
};

const findAll = async () => {
  //
  const categories = await Category.findAll();

  if (!categories) return null;

  return categories;
};

const checkCategoriesExist = async (categoryIds) => {
  //
  const { count } = await Category.findAndCountAll({
    where: {
      id: {
        [Op.in]: categoryIds,
      },
    },
  });
  
  const allCategoriesExist = count === categoryIds.length;

  return allCategoriesExist;
};

module.exports = {
  findAll,
  create,
  createPostCategory,
  checkCategoriesExist,
};