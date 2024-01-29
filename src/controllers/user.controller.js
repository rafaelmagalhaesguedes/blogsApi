const { userService } = require('../services');
const httpStatus = require('../utils/mapStatusHTTP');

const createUser = async (req, res) => {
  const userData = req.body;
  try {
    const { status, data } = await userService.createUser(userData);
    return res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  const { status, data } = await userService.getAllUsers();
  return res.status(httpStatus[status]).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const { status, data } = await userService.getUserById(id);
    return res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};