const { Op } = require('sequelize');
const { BlogPost, Category } = require('../../models');
const { httpError } = require('../../utils/httpErrors');

const checkCategoriesExist = async (categoryIds) => {
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

const checkPostExist = async (id) => {
  const post = await BlogPost.findByPk(id);
  if (!post) {
    throw httpError('Post does not exist', 404);
  }
  return post;
};

const checkUserIsAuthor = (post, userId) => {
  if (post.userId !== userId) {
    throw httpError('Unauthorized user', 401);
  }
};

const validatePostBody = ({ title, content, categoryIds }) => {
  if (!title || !content || !categoryIds) {
    throw httpError('Some required fields are missing', 400);
  }
};

const validateCategory = async (categoryIds) => {
  const categories = await checkCategoriesExist(categoryIds); 
  if (!categories) {
    throw httpError('one or more "categoryIds" not found', 400);
  }
};

module.exports = {
  validatePostBody,
  validateCategory,
  checkPostExist,
  checkUserIsAuthor,
};