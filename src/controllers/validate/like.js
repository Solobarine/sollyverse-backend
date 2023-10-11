const Joi = require ('joi');

const schema = Joi.object({
  city: Joi.string().required(),
  user: Joi.string().required()
})

module.exports = schema;
