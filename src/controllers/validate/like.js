const Joi = require ('joi');

const schema = Joi.object({
  destinationId: Joi.string().required(),
  destination: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}}).required()
})

module.exports = schema;
