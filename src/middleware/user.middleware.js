const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string().required().messages({
    'string.base': '"image" must be a string',
  }),
});

const validateUser = (req, res, next) => {
  //
  const { displayName, email, password, image } = req.body;

  const { error } = userSchema.validate({ displayName, email, password, image });
  if (error) {
    return res.status(400).json({ status: 'INVALID_VALUE', message: error.details[0].message });
  }

  next();
};

module.exports = { validateUser };