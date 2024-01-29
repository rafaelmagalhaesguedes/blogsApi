const { categoryService } = require('../services');
const httpStatus = require('../utils/mapStatusHTTP');

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const { status, data } = await categoryService.createCategory(name);
    return res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  const { status, data } = await categoryService.getAllCategories();
  
  return res.status(httpStatus[status]).json(data);
};

module.exports = {
  createCategory,
  getAllCategories,
};