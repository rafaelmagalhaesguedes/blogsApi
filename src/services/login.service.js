const { createToken } = require('../utils/auth');
const { loginValidate } = require('./validations');

const loginService = async (email, password) => {
  // Validate the request body
  loginValidate.validateRequestBody(email, password);

  // Find the user by email
  const user = await loginValidate.validateUserByEmail(email);

  // Validate the password
  loginValidate.validatePassword(password, user.password);

  // Create the token
  const token = createToken({ id: user.id, email: user.email });

  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = { 
  loginService,
};