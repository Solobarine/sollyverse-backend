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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    default: ''
  },
  images: {
    type: Array,
    required: true
  },
  cost: {
    type: Number,
    required: true,
    default: 0
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
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  }
}, {timestamps: true});

module.exports = mongoose.model('City', City);
