const { User } = require('../../models');
const { userSchema } = require('./schemas/user.schema');

/* 
  Validate user body data
*/
const validateUserBody = (displayName, email, password, image) => {
  const { error } = userSchema.validate({ displayName, email, password, image });
  if (error) throw new Error(error.message);
};

/* 
  Validate if user already exists
*/
const validateUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) throw new Error('User already registered');
  return false;
};

module.exports = {
  validateUserBody,
  validateUserByEmail,
};