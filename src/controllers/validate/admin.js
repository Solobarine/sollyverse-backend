const Joi = require ('joi')

const schema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(8).max(16).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  countryOfOrigin: Joi.string().min(3).required(),
  addressOne: Joi.string().required(),
  countryOfResidence: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required()
})

module.exports = schema
