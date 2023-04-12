const Joi = require ('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
  description: Joi.string().min(50).max(500).required(),
  longitude: Joi.string().required(),
  latitude: Joi.string().required()
})

module.exports = schema;
