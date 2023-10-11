const mongoose = require ('mongoose');

const Reservation = mongoose.Schema({
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  status: {
    type: String,
    default: 'pending'
  }
}, {timestamps: true});

module.exports = mongoose.model('Reservation', Reservation);
