const jwt = require ('jsonwebtoken');
const User = require('../models/User');
const likeController = require('../controllers/likeController');
require('dotenv').config()

const loginWithToken = async (req, res) => {
  const token = req.header('authentication_token')
  console.log(token)
  if (!token) return res.status(401).send({error: 'Access Denied'})
  
  try {
    console.log(process.env.PRIVATE_KEY);
    const validate = jwt.verify(token, process.env.SECURE_PASSWORD)
    console.log(validate)
    const user = await User.findById(validate._id)
    const userLikes = await likeController.showUserLikes(validate._id)
    console.log(user)
    res.status(200).send({user, userLikes})
  } catch (error) {
    res.status(400).send({error: 'Invalid Token'})
  }
}

module.exports = loginWithToken