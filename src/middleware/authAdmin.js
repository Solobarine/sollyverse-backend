const jwt = require ('jsonwebtoken')
const User = require('../models/User')

const verifyAdmin = async (req, res, next) => {
  const token = res.header('authentication_token')
  if (!token) res.status(401).send('Token not found')

  try {
    const validate = jwt.verify(token, process.env.PRIVATE_KEY)
    const user = await User.findById(validate).select({__id})
    req.user = user
    next()
  } catch (error) {
    /* handle error */
    res.status(500).send({error})
  }
}

module.exports = verifyAdmin
