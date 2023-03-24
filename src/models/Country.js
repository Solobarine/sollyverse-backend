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
    max: 600,
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
  likes: {
    type: Number,
    default: 0.0
  }
}, {timestamps: true})

module.exports = mongoose.model('Country', Country);
