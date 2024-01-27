const { loginService } = require('../services');
const httpStatus = require('../utils/mapStatusHTTP');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { status, data } = await loginService.loginService(email, password);
    return res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(httpStatus.INVALID_VALUE).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
};
