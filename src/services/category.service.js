const { Category } = require('../models');

const createCategory = async (name) => {
  // Validate if name is empty
  if (!name) return { status: 'INVALID_VALUE', data: { message: '"name" is required' } };
  
  // Create category
  const category = await Category.create({ name });

  return { status: 'CREATED', data: category };
};

module.exports = {
  createCategory,
};