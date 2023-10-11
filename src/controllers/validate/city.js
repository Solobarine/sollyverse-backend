const Joi = require ('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
  cost: Joi.number().required(),
  description: Joi.string().min(50).max(5000).required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required()
})

module.exports = schema;
