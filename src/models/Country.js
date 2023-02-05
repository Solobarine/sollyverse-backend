const mongoose = require 'mongoose';

const Country = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: '',
    unique: true
  },
  descriptiom: {
    type: String,
    required: true,
    default: '',
    trim: true
  },
  capital: {
    type: String,
    trim: true,
    required: true,
    default: '',
  },
  continent: {
    type: String,
    trim: true,
    required: true,
    default: '',
  },
  officialLanguage: {
    type: String,
    trim: true,
    required: true,
    default: '',
  },
  location: {
    longitude: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
      default: 0.0000
    },
    latitude: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
      default: 0.0000
    }
  },
  ratings: {
    type: Number,
    min: 1,
    max: 5,
    default: 0.0
  }
})

module.exports = mongoose.model('Country', Country);
