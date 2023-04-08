const mongoose = require ('mongoose')

const schema = mongoose.Schema({
  email: {
    type: String,
    match:  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    required: true,
    trim: true,
    unique: true,
    default: ''
  },
  password: {
    type: String,
    trim: true,
    required: true,
    default: ''
  },
  staffId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Admin', schema)
