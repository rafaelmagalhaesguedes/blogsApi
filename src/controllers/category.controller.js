const { categoryService } = require('../services');
const httpStatus = require('../utils/mapStatusHTTP');

const createCategory = async (req, res) => {
  const { name } = req.body;
  
  const { status, data } = await categoryService.createCategory(name);
  
  return res.status(httpStatus[status]).json(data);
};

module.exports = {
  createCategory,
};