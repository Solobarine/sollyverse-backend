const Joi = require('joi');

const schema = Joi.object({
  destinationId: Joi.string().required(),
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.ref(firstName),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  reviewTitle: Joi.string().min(2).max(15).required(),
  review: Joi.string().min(2).max(70).required(),
});

module.exports = schema
