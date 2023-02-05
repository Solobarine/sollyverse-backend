const mongoose = require 'mongoose';

const City = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    default: ''
  },
  country: {
    type: String,
    required: true,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    min: 50,
    max: 200,
    trim: true,
    required: true,
    default: ''
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0.0
  },
  location: {
    longitude: {
      type: Number,
      required: true,
      unique: true,
      default: 0.0000
    },
    latitude: {
      type: Number,
      required: true,
      unique: true,
      default: 0.0000
    }
  },
  visitors: {
    type: Number,
    default: 0,
    required: true
  },
  timestamp
});

module.exports = mongoose.model('City', City);
