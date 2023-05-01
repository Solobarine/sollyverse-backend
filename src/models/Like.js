const mongoose = require ('mongoose');

const Like = mongoose.Schema({
  destinationId: {
    type: String,
    required: true,
    default: ''
  },
  destination: {
    type: String,
    required: true,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    match:  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    required: true,
    trim: true,
    default: ''
  },
}, {timestamps: true})

module.exports = mongoose.model('Like', Like);
