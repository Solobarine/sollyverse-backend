const jwt = require ('jsonwebtoken')
const Admin = require('../models/Admin')
require('dotenv').config()

const verifyAdmin = async (req, res, next) => {
  const token = req.header('authentication_token')
  console.log(token);
  if (!token) return res.status(401).send({error: 'Token not found'})

  try {
    const validate = jwt.verify(token, process.env.SECURE_PASSWORD)
    const admin = await Admin.findById(validate._id).select({_id: 1})
    console.log(validate)
    req.admin = admin
    next()
  } catch (error) {
    res.status(500).send({error: "An error occured"})
    console.log(error)
  }
}

module.exports = verifyAdmin
