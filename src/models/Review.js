const mongoose = require ('mongoose');

const Review = mongoose.Schema({
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    min: 2,
    max: 60,
    required: true,
    trim: true,
    default: ''
  },
  review: {
    type: String,
    min: 2,
    max: 800,
    trim: true,
    default: '',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model('Review', Review);
