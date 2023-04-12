const Joi = require ('joi')

const schema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  gender: Joi.string().max(20).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(8).max(20).required(),
  confirmPassword: Joi.string().min(8).max(20).required(),
  phoneNumber: Joi.string().pattern(new RegExp('^[\s()+-]*([0-9][\s()+-]*){6,20}$')).required(),
  dateOfBirth: Joi.date().less('2007-1-1').greater('1920-1-1'),
  countryOfOrigin: Joi.string().min(3).required(),
  addressOne: Joi.string().required(),
  addressTwo: Joi.string(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  countryOfResidence: Joi.string().required(),
  zipCode: Joi.number().min(100000).max(999999).required()
})

module.exports = schema
