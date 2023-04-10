const Joi = require ('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().min(20).required(),
  capital: Joi.string().required(),
  continent: Joi.string().required(),
  officialLanguage: Joi.string().required(),
  location: {
    longitude: Joi.string().required(),
    latitude: Joi.string().required()
  }
})

module.exports = schema;
