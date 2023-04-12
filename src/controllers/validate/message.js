const Joi = require ('joi');

const schema = Joi.object({
  sender: Joi.string().required(),
  receiver: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}}).required(),
  message: Joi.string().min(10).max(200)
})

module.exports = schema;
