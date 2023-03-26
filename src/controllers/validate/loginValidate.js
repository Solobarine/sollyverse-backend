const Joi = require ('joi');

const loginValidate = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}}),
  password: Joi.string().min(8).max(20).required()
});

module.exports = loginValidate;
