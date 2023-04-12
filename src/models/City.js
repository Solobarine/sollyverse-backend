const mongoose = require ('mongoose');

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
    trim: true,
    required: true,
    default: ''
  },
  longitude: {
    type: String,
    required: true,
    default: 0.0000
  },
  latitude: {
    type: String,
    required: true,
    default: 0.0000
  }
}, {timestamps: true});

module.exports = mongoose.model('City', City);
