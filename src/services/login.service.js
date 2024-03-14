const { createToken } = require('../utils/auth');
const { loginValidate } = require('./validations');

const loginService = async (email, password) => {
  //
  loginValidate.validateRequestBody(email, password);
  const user = await loginValidate.validateUserByEmail(email);
  loginValidate.validatePassword(password, user.password);

  // Create token
  try {
    const token = createToken({ id: user.id, email: user.email });
    return { status: 'SUCCESSFUL', data: { token } };
  } catch (error) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: error.message } };
  }
};

module.exports = { 
  loginService,
};