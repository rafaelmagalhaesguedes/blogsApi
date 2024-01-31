const { userRepository } = require('./repository');
const { userValidate } = require('./validations');
const { httpError } = require('../utils/httpErrors');

const createUser = async ({ displayName, email, password, image }) => {
  userValidate.validateUserBody(displayName, email, password, image);
  await userValidate.validateUserByEmail(email);

  const token = await userRepository.create({ displayName, email, password, image });

  return { status: 'CREATED', data: { token } };
};

const getAllUsers = async () => {
  const users = await userRepository.findAll();

  if (!users) throw httpError('Users does not exist', 404);

  return { status: 'SUCCESSFUL', data: users };
};

const getUserById = async (id) => {
  const user = await userRepository.findById(id);

  if (!user) throw httpError('User does not exist', 404);

  return { status: 'SUCCESSFUL', data: user };
};

const deleteUser = async (id, email) => {
  if (!id || !email) throw httpError('id and email is required', 400);
  
  await userRepository.destroy(id, email);
  
  return { status: 'NO_CONTENT', data: null };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
