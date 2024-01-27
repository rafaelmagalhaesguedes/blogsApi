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

module.exports = { 
  bodySchema,
};