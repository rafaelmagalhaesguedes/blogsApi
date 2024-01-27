const { createToken } = require('../utils/auth');
const login = require('./validations/login.validate');

const loginService = async (email, password) => {
  // Validate the request body
  login.validateRequestBody(email, password);

  // Find the user by email
  const user = await login.validateUserByEmail(email);

  // Validate the password
  login.validatePassword(password, user.password);

  // Create the token
  const token = createToken({ id: user.userId, email: user.userEmail });

  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = { 
  loginService,
};