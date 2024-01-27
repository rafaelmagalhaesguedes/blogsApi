const { userService } = require('../services');
const httpStatus = require('../utils/mapStatusHTTP');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const { status, data } = await userService.createUser(displayName, email, password, image);
    return res.status(httpStatus[status]).json(data);
  } catch (error) {
    if (error.message === 'User already registered') {
      return res.status(httpStatus.CONFLICT).json({ message: error.message });
    }
    return res.status(httpStatus.INVALID_VALUE).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { status, data } = await userService.getAllUsers();
    return res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_ERROR).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const { status, data } = await userService.getUserById(id);
    return res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};