const mongoose = require ('mongoose');

const Country = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: '',
    unique: true
  },
  description: {
    type: String,
    required: true,
    min: 20,
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
      type: String,
      required: true,
      trim: true,
      unique: true,
      default: '0.0000'
    },
    latitude: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      default: '0.0000'
    }
  }
}, {timestamps: true})

module.exports = mongoose.model('Country', Country);
