const jwt = require ('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  const token = req.header('authentication_token')
  if (!token) return res.status(401).send('Access Denied')

  try {
    const validate = jwt.verify(token, process.env.PRIVATE_KEY)
    const user = await User.findById(validate).select({_id})
    req.user = user
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}

module.exports = verifyToken
