const mongoose = require ('mongoose');

const Message = mongoose.Schema({
  sender: {
    type: String,
    default: 'Sollyverse'
  },
  receiver: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    min: 3,
    max: 60,
    default: ''
  },
  email: {
    type: String,
    match:  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    required: true,
    trim: true,
    default: ''
  },
  message: {
    type: String,
    min: 10,
    max: 100,
    required: true,
    trim: true,
    default: ''
  },
  opened: {
    type: Boolean,
    default: false
  },
  important: {
    type: Boolean,
    default: false
  },
  archived: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

module.exports = mongoose.model('Message', Message);
