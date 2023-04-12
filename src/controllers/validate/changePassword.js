const Joi = require ('joi');

const schema = Joi.object({
  oldPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')).min(8).max(20),
  newPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')).min(8).max(20),
  confirmNewPassword: Joi.ref(newPassword)
});

module.exports = schema;

