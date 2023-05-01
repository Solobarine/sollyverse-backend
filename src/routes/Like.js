const express = require ('express')
const auth = require ('../middleware/auth')
const controller = require ('../controllers/likeController')

const router = express.Router()

// Post a Like
router.post('/', auth, controller.create)

// Get all Likes
router.get('/:id', auth, controller.showNumberOfLikes)

// Get User Likes
router.post('/user', auth, controller.showUserLikes)

// Cancel Like
router.delete('/delete/:id', auth, controller.delete)

module.exports = router
