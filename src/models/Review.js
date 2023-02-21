const mongoose = require ('mongoose');

const Review = mongoose.Schema({
  destinationId: {
    type: String,
    match: '',
    required: true,
    trim: true,
    default: ''
  },
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
  reviewTitle: {
    type: String,
    min: 2,
    max: 20,
    required: true,
    trim: true,
    default: ''
  },
  review: {
    type: String,
    min: 2,
    max: 70,
    trim: true,
    default: '',
    required: true
  },
  timestamp
});

module.exports = mongoose.model('Review', Review);
