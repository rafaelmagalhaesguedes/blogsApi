const Joi = require('joi');

const errorMessage = 'Some required fields are missing';

const bodySchema = Joi.object({
  email: Joi.string().required().messages({
    'string.required': errorMessage,
    'string.empty': errorMessage,
  }),
  password: Joi.string().required().messages({
    'string.required': errorMessage,
    'string.empty': errorMessage,
  }),
});

const validateLogin = (req, res, next) => {
  //
  const { email, password } = req.body;

  const { error } = bodySchema.validate({ email, password });

  if (error) {
    return res.status(400).json({ status: 'INVALID_FIELDS', message: error.details[0].message });
  }

  next();
};

module.exports = {
  validateLogin,
};