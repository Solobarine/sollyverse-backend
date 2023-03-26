const jwt = require ('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const verifyAdmin = async (req, res, next) => {
  const token = res.header('authentication_token')
  if (!token) res.status(401).send({error: 'Token not found'})

  try {
    const validate = jwt.verify(token, process.env.PRIVATE_KEY)
    const user = await User.findById(validate._id).select({__id})
    req.user = user
    next()
  } catch (error) {
    res.status(500).send({error})
  }
}

module.exports = verifyAdmin
