const { Op } = require('sequelize');
const { Category, PostCategory } = require('../../models');

const create = async (name) => {
  const category = await Category.create({ name });
  return category;
};

const createPostCategory = async (categoryIds, postId) => {
  const categories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  const postCategories = categories.map((category) => ({ postId, categoryId: category.id }));

  await PostCategory.bulkCreate(postCategories);
};

const findAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  create,
  createPostCategory,
  findAll,
};