const { User } = require('../models');
const { createToken } = require('../utils/auth');
const { validateUserBody, validateUserByEmail } = require('./validations/user.validate');

/* 
  Create new user
*/
const createUser = async (displayName, email, password, image) => {
  // Validate user body data 
  validateUserBody(displayName, email, password, image);

  // Validate if user already exists
  await validateUserByEmail(email);

  // Create user and token
  const user = await User.create({ displayName, email, password, image });
  const token = createToken({ email: user.userEmail });

  return { status: 'CREATED', data: { token } };
};

/* 
  Get all users
*/
const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { status: 'SUCCESSFUL', data: users };
};

module.exports = {
  createUser,
  getAllUsers,
};
