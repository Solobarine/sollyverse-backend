const express = require ('express')
const auth = require ('../middleware/auth')
const controller = require ('../controllers/reviewController')

const router = express.Router()

// Post a Review
router.post('/', auth, controller.create)

// Show 5 Reviews
router.get('/city/:id', auth, controller.showFive)

// Check if user reviwed a destination
router.post('/city/user', auth, controller.showOne)

// Show all reviews
router.get('/city/all', auth, controller.showAll)

// Update Review
router.patch('/:id', auth, controller.update)

module.exports = router
