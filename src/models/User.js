const mongoose = require 'mongoose';

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
  }
  nickName,
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
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    trim: true,
    required: true,
    default: ''
  },
  phoneNumber: {
    type: String,
    match:  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/,
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
  nationality: {
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
    default: '',
    required: true
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
  country: {
    type: String,
    trim: true,
    default: '',
    required: true
  },
  zipCode: {
    type: Number,
    required: true,
    min: 6,
    max: 6,
    default: 000000
  },
});

module.exports = mongoose.model('User'. User);
