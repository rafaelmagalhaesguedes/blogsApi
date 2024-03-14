const { categoryService } = require('../services');
const { httpStatus } = require('../utils/httpStatus');

const createCategory = async (req, res) => {
  //
  const { name } = req.body;
  const { status, data } = await categoryService.createCategory(name);

  return res.status(httpStatus[status]).json(data);
};

const getAllCategories = async (req, res) => {
  //
  const { status, data } = await categoryService.getAllCategories();
  return res.status(httpStatus[status]).json(data);
};

module.exports = {
  createCategory,
  getAllCategories,
};