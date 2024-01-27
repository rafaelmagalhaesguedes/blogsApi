const userService = require('../services/login.service');
const httpStatus = require('../utils/mapStatusHTTP');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { status, data } = await userService.loginService(email, password);
    return res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(httpStatus.INVALID_VALUE).json({ message: error.message });
  }
};

module.exports = {
  loginController,
};
