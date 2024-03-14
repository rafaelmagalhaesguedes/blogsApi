const { userRepository } = require('./repository');
const { userValidate } = require('./validations');

const createUser = async ({ displayName, email, password, image }) => {
  //
  userValidate.validateUserBody(displayName, email, password, image);
  await userValidate.validateUserByEmail(email);

  try {
    const token = await userRepository.create({ displayName, email, password, image });
    return { status: 'CREATED', data: { token } };
  } catch (error) {
    console.log(error.message);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: error.message } };
  }
};

const getAllUsers = async () => {
  //
  const users = await userRepository.findAll();

  if (!users) return { status: 'NOT_FOUND', data: { message: 'Users does not exist' } };

  return { status: 'SUCCESSFUL', data: users };
};

const getUserById = async (id) => {
  //
  const user = await userRepository.findById(id);

  if (!user) return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };

  return { status: 'SUCCESSFUL', data: user };
};

const deleteUser = async (id, email) => {
  //
  if (!id || !email) {
    return { status: 'INVALID_VALUE', data: { message: 'Invalid id or email' } };
  }
  
  try {
    await userRepository.destroy(id, email);
    return { status: 'NO_CONTENT', data: null };
  } catch (error) {
    console.log(error.message);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: error.message } };
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
