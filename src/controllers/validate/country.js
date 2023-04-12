const Joi = require ('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().min(20).max(600).required(),
  capital: Joi.string().required(),
  continent: Joi.string().required(),
  officialLanguage: Joi.string().required(),
  location: {
    longitude: Joi.number().required(),
    latitude: Joi.number().required()
  },
  likes: Joi.number()
})

module.exports = schema;
