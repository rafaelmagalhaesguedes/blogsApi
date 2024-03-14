const { userService } = require('../services');
const { httpStatus } = require('../utils/httpStatus');

const createUser = async (req, res) => {
  //
  const { status, data } = await userService.createUser(req.body);
  return res.status(httpStatus[status]).json(data);
};

const getAllUsers = async (_req, res) => {
  //
  const { status, data } = await userService.getAllUsers();
  return res.status(httpStatus[status]).json(data);
};

const getUserById = async (req, res) => {
  //
  const { status, data } = await userService.getUserById(req.params.id);
  return res.status(httpStatus[status]).json(data);
};

const deleteUser = async (req, res) => {
  //
  const { id, email } = req.user;
  
  const { status, data } = await userService.deleteUser(id, email);
  return res.status(httpStatus[status]).json(data);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};