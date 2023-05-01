const Joi = require('joi');

const schema = Joi.object({
  destinationId: Joi.string().required(),
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  title: Joi.string().min(2).max(60).required(),
  review: Joi.string().min(2).max(70).required(),
  rating: Joi.number().min(1).max(5).required()
});

module.exports = schema
