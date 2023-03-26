const Joi = require ('joi')

const schema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(8).max(20).required(),
  confirmPassword: Joi.string().min(8).max(20).required(),
  phoneNumber: Joi.string().pattern(new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$')).required(),
  dateOfBirth: Joi.date().less('1-1-2007').greater('1-1-1920'), 
})

module.exports = schema
