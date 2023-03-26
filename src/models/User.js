const mongoose = require ('mongoose');

const User = mongoose.Schema({
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
  nickName: {
    type: String,
    required: true,
    trim: true,
    default: ''
  },
  email: {
    type: String,
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
    trim: true,
    required: true,
    unique: true,
    default: ''
  },
  dateOfBirth: {
    type: Date,
    trim: true,
    max: '2005-01-01',
    min: '1930-12-31',
    default: '',
    required: true
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
    default: 000000
  },
  hash: {
    type: String,
    default: ''
  }
}, {timestamps: true});

module.exports = mongoose.model('User', User)
