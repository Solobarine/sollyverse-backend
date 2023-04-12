const mongoose = require ('mongoose');

const Comment = mongoose.Schema({
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
  comment: {
    type: String,
    min: 50,
    max: 200,
    default: '',
    trim: true,
    required: true
  },
  timestamp
})

module.exports = mongoose.model('Comment', Comment);
