const jwt = require ('jsonwebtoken');
const Admin = require('../models/Admin');

const loginWithTokenAdmin = async (req, res) => {
  const token = req.header('authentication_token')
  console.log(token)
  if (!token) return res.status(401).send({error: 'Access Denied'})

  try {
    const validate = jwt.verify(token, process.env.SECURE_PASSWORD)
    console.log(validate)
    const admin = await Admin.findById(validate._id)
    console.log(admin)
    res.status(200).send({admin})
  } catch (error) {
    res.status(400).send({error: 'Invalid Token'})
  }
}

module.exports = loginWithTokenAdmin