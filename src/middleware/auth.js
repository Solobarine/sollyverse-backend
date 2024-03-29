const jwt = require ('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()

const verifyToken = async (req, res, next) => {
  const token = req.header('authentication_token')
  if (!token) return res.status(401).send({error: 'Access Denied'})

  try {
    console.log(token)
    const validate = jwt.verify(token, process.env.SECURE_PASSWORD)
    const user = await User.findById(validate._id).select({_id: 1})
    req.user = user
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}

module.exports = verifyToken
