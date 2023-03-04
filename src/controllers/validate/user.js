const Joi = require('joi');

const userSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.ref(firstName),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')).min(8).max(20).required(),
  confirmPassword: Joi.ref(password),
  phoneNumber: Joi.string().pattern(new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$')),
  dateOfBirth: Joi.date().less('1-1-2007').greater('1-1-1920'), 
})

module.exports = userSchema
