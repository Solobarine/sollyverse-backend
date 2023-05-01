const Joi = require ('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
  cost: Joi.number().required(),
  description: Joi.string().min(50).max(1500).required(),
  images: Joi.array(),
  longitude: Joi.string().required(),
  latitude: Joi.string().required()
})

module.exports = schema;
