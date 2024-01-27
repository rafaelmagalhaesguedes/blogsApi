const { User } = require('../models');
const { createToken } = require('../utils/auth');
const { userSchema } = require('./validations/user.schema');

/* 
  Find user by email
*/
const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) throw new Error('User already registered');
  return false;
};

/* 
  Create new user
*/
const createUser = async (displayName, email, password, image) => {
  // Validate user body data 
  const { error } = userSchema.validate({ displayName, email, password, image });
  if (error) throw new Error(error.message);

  // Check if user already exists
  await findUserByEmail(email);

  // Create user and token
  const user = await User.create({ displayName, email, password, image });
  const token = createToken({ email: user.userEmail });

  return { status: 'CREATED', data: { token } };
};

module.exports = {
  createUser,
};
