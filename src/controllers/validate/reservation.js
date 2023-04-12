const Joi = require ('joi');

const schema = Joi.object({
  cityId: Joi.string().required(),
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}}).required(),
  startDate: Joi.string().isoDate().required(),
  endDate: Joi.string().isoDate().required(),
  cost: Joi.number().required(),
})

module.exports = schema;
