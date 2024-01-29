const { Op } = require('sequelize');
const { Category } = require('../../models');

/* 
  Find all categories by id and count them to compare
  with the length of the array of ids
*/
const findCategories = async (categoryIds) => {
  const { count } = await Category.findAndCountAll({
    where: {
      id: {
        [Op.in]: categoryIds,
      },
    },
  });
  const isAllCategoriesExist = count === categoryIds.length;
  return isAllCategoriesExist;
};

/* 
  Validate post body data
*/
const validatePostBody = ({ title, content, categoryIds }) => {
  if (!title || !content || !categoryIds) {
    throw new Error('Some required fields are missing');
  }
};

/* 
  Validate if all categories exists  
*/
const validateCategory = async (categoryIds) => {
  if (!await findCategories(categoryIds)) {
    throw new Error('one or more "categoryIds" not found');
  }
};

module.exports = {
  validatePostBody,
  validateCategory,
};