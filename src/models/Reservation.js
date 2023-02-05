const mongoose = require 'mongoose';

const Reservation = mongoose.Schema({
  cityId: {
    type: String,
    match: '',
    trim: true,
    default: '',
    required: true
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
  startDate: {
    type: Date,
    required: true,
    trim: true,
    default: ''
  },
  endDate: {
    type: Date,
    trim: true,
    default: '',
    required: true
  },
  cost: {
    type: Number,
    default: 0,
    required: true
  },
  status: 'pending',
  timestamp
});

module.exports = mongoose.model('Reservation', Reservation);
