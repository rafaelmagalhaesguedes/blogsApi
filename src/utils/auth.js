const jwt = require('jsonwebtoken');

const createToken = ({ id, email }) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};

const splitToken = (authorization) => {
  const token = authorization.split(' ')[1];
  return token;
};

module.exports = {
  createToken,
  verifyToken,
  splitToken,
};