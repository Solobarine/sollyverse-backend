const jwt = require ('jsonwebtoken')
const Admin = require('../models/Admin')
require('dotenv').config()

const verifyAdmin = async (req, res, next) => {
  const token = req.header('admin_auth_token')
  if (!token) return res.status(401).send({error: 'Token not found'})

  try {
    const validate = jwt.verify(token, process.env.PRIVATE_KEY)
    const admin = await Admin.findById(validate._id).select({_id: 1})
    req.admin = admin
    next()
  } catch (error) {
    res.status(500).send({error: "An error occured"})
    console.log(error)
  }
}

module.exports = verifyAdmin
