const { createToken } = require('../utils/auth');
const { bodySchema } = require('./validations/schemas/login.schema');
const { User } = require('../models');

/* 
  Validate the request body
*/
const validateRequestBody = (email, password) => {
  const { error } = bodySchema.validate({ email, password });
  if (error) throw new Error('Some required fields are missing');
};

/*
  Find the user by email
*/
const findUserByEmail = async (email) => {
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

/* 
  Login service
*/
const loginService = async (email, password) => {
  validateRequestBody(email, password);

  const user = await findUserByEmail(email);

  validatePassword(password, user.password);

  const token = createToken({ id: user.userId, email: user.userEmail });

  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = { 
  loginService,
};