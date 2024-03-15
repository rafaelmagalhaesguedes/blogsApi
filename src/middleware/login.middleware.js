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

const validateLogin = (email, password) => {
  //
  const { error } = bodySchema.validate({ email, password });
  if (error) {
    return { status: 'INVALID_FIELDS', data: { message: error.message } };
  }
};

module.exports = {
  validateLogin,
};