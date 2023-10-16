const Joi = require ('joi');

const schema = Joi.object({
  city: Joi.string().required(),
  user: Joi.string().required(),
  startDate: Joi.string().isoDate().required(),
  endDate: Joi.string().isoDate().required(),
  cost: Joi.number().required(),
})

module.exports = schema;
