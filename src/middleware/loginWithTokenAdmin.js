const jwt = require ('jsonwebtoken');
const Admin = require('../models/Admin');
const Staff = require ('../models/Staff')
require('dotenv').config()

const loginWithToken = async (req, res) => {
  const token = req.header('authentication_token')
  console.log(token)
  if (!token) return res.status(401).send({error: 'Access Denied'})

  try {
    const validate = jwt.verify(token, process.env.PRIVATE_KEY)
    console.log(validate)
    const isAdmin = await Admin.findById(validate._id).select({staffId: 1})
    console.log(isAdmin)
    const admin = await Staff.findById(isAdmin.staffId)
    res.status(200).send({admin})
  } catch (error) {
    res.status(400).send({error: 'Invalid Token'})
  }
}

module.exports = loginWithToken