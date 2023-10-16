const Joi = require('joi');

const schema = Joi.object({
  city: Joi.string().required(),
  user: Joi.string().required(),
  title: Joi.string().min(2).max(60).required(),
  review: Joi.string().min(2).max(70).required(),
  rating: Joi.number().min(1).max(5).required()
});

module.exports = schema
