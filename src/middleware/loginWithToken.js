const jwt = require ('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()

const loginWithToken = async (req, res) => {
  const token = req.header('authentication_token')
  console.log(token)
  if (!token) return res.status(401).send({error: 'Access Denied'})

  try {
    const validate = jwt.verify(token, process.env.PRIVATE_KEY)
    console.log(validate)
    const user = await User.findById(validate._id)
    console.log(user)
    res.status(200).send({user})
  } catch (error) {
    res.status(400).send({error: 'Invalid Token'})
  }
}

module.exports = loginWithToken