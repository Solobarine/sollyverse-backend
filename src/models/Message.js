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
    unique: true,
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
  status: {
    type: String,
    default: 'unopened'
  },
}, {timestamps: true});

module.exports = mongoose.model('Message', Message);
