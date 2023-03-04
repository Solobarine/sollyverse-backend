const Joi = require ('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
  description: Joi.string().min(50).max(500).required(),
  ratings: Joi.number().required(),
  location: {
    longitude: Joi.number().required(),
    latitude: Joi.number().required()
  },
  visitors: Joi.number().integer().required()
})

module.exports = schema;
