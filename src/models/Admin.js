const mongoose = require ('mongoose')

const schema = mongoose.Schema({
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
  countryOfResidence: {
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
  city: {
    type: String,
    trim: true,
    default: '', 
    required: true
  }
})

module.exports = mongoose.model('Admin', schema)
