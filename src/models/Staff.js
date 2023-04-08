const mongoose = require ('mongoose')

const Staff = mongoose.Schema({
 firstName: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    min: 2,
    max: 30,
    default: ''
  },
  lastName: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    min: 2,
    max: 30,
    default: ''
  },
  gender: {
    type: String,
    default: '',
    required: true
  },
  email: {
    type: String,
    match:  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    required: true,
    trim: true,
    unique: true,
    default: ''
  },
  password: {
    type: String,
    trim: true,
    required: true,
    default: ''
  },
  phoneNumber: {
    type: String,
    match:  /^[\+]?[0-9]{3}?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/,
    trim: true,
    required: true,
    unique: true,
    default: ''
  },
  countryOfOrigin: {
    type: String,
    trim: true,
    default: '',
    required: true
  },
  addressOne: {
    type: String,
    trim: true,
    default: '',
    required: true
  },
  addressTwo: {
    type: String,
    trim: true,
    default: ''
  },
  city: {
    type: String,
    trim: true,
    default: '', 
    required: true
  },
  state: {
    type: String,
    trim: true,
    default: '',
    required: true
  },
  countryOfResidence: {
    type: String,
    trim: true,
    default: '',
    required: true
  },
  zipCode: {
    type: Number,
    required: true,
    min: 100000,
    max: 999999,
    default: 100000
  },
}, {timestamps: true});

module.exports = mongoose.model('Staff', Staff);
