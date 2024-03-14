const { loginService } = require('../services');
const { httpStatus } = require('../utils/httpStatus');

const loginUser = async (req, res) => {
  //
  const { email, password } = req.body;
  const { status, data } = await loginService.loginService(email, password);
  
  return res.status(httpStatus[status]).json(data);
};

module.exports = {
  loginUser,
};
