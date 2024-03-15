//
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { createToken } = require('../utils/auth');

const loginService = async (email, password) => {
  //
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return { status: 'INVALID_VALUE', data: { message: 'Invalid fields' } };
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return { status: 'INVALID_VALUE', data: { message: 'Invalid fields' } };
  }

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