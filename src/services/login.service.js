const { createToken } = require('../utils/auth');
const { loginValidate } = require('./validations');

const loginService = async (email, password) => {
  // Validates
  loginValidate.validateRequestBody(email, password);
  const user = await loginValidate.validateUserByEmail(email);
  loginValidate.validatePassword(password, user.password);

  // Create token
  const token = createToken({ id: user.id, email: user.email });

  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = { 
  loginService,
};