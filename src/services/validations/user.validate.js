const { User } = require('../../models');
const { httpError } = require('../../utils/httpErrors');
const { userSchema } = require('./schemas/user.schema');

const validateUserBody = (displayName, email, password, image) => {
  const { error } = userSchema.validate({ displayName, email, password, image });
  if (error) throw httpError(error.message, 400);
};

const validateUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) throw httpError('User already registered', 409);
};

module.exports = {
  validateUserBody,
  validateUserByEmail,
};