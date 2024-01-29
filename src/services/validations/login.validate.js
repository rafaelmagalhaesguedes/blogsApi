const { bodySchema } = require('./schemas/login.schema');
const { User } = require('../../models');
const { httpError } = require('../../utils/httpErrors');

const validateRequestBody = (email, password) => {
  const { error } = bodySchema.validate({ email, password });
  if (error) {
    throw httpError(error.message, 400);
  }
};

const validateUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw httpError('Invalid fields', 400);
  }
  return user;
};

const validatePassword = (password, userPassword) => {
  if (password !== userPassword) {
    throw httpError('Invalid fields', 400);
  }
};

module.exports = {
  validateRequestBody,
  validateUserByEmail,
  validatePassword,
};