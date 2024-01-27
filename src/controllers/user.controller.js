const userService = require('../services/user.service');
const httpStatus = require('../utils/mapStatusHTTP');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const { status, data } = await userService.createUser(displayName, email, password, image);
    return res.status(httpStatus[status]).json(data);
  } catch (error) {
    if (error.message === 'User already registered') {
      return res.status(httpStatus.CONFLICT).json({ message: error.message });
    }
    return res.status(httpStatus.INVALID_VALUE).json({ message: error.message });
  }
};

module.exports = {
  createUser,
};