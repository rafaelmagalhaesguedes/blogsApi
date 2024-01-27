const { bodySchema } = require('./schemas/login.schema');
const { User } = require('../../models');

/* 
  Validate the request body
*/
const validateRequestBody = (email, password) => {
  const { error } = bodySchema.validate({ email, password });
  if (error) throw new Error('Some required fields are missing');
};

/*
  Validate the user by email
*/
const validateUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid fields');
  return user;
};

/* 
  Validate the password
*/
const validatePassword = (password, userPassword) => {
  if (password !== userPassword) throw new Error('Invalid fields');
};

module.exports = {
  validateRequestBody,
  validateUserByEmail,
  validatePassword,
};