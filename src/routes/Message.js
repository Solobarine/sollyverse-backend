const express = require ('express')
const auth = require ('../middleware/auth')
const admin = require ('../middleware/authAdmin')
const controller = require ('../controllers/messageController')

const router = express.Router()

// Create a Message
router.post('/', admin, controller.create)

// Get User Message
router.get('/', auth, controller.view)

module.exports = router
