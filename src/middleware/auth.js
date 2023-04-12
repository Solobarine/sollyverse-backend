const jwt = require ('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('authentication_token')
  if (!token) return res.status(401).send('Access Denied')

  try {
    const validate = jwt.verify(token, process.env.PRIVATE_KEY)
    const user = validate
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}

module.exports = verifyToken
