const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ogroDoLameiro';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const createToken = (id, email) => {
  const token = jwt.sign({ id, email }, JWT_SECRET, jwtConfig);
  return token;
};

const verify = (token) => {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
};

module.exports = {
  createToken,
  verify,
};