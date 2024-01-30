const { splitToken, verifyToken } = require('../utils/auth');
const httpStatus = require('../utils/mapStatusHTTP');

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const token = splitToken(authorization);
    const user = verifyToken(token);

    req.user = user;
    next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { 
  authenticate,
};