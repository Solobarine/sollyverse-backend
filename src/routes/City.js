const express = require ('express')
const auth = require ('../middleware/auth')
const admin = require ('../middleware/authAdmin')
const controller = require ('../controllers/cityController')
const upload = require('../middleware/upload')

const router = express.Router()

// Get all Cities
router.get('/', controller.showAll)

// Create a City
router.post('/', controller.create)

// Get a City
router.get('/:id', controller.showOne)

// Show favourite cities
router.get('/favourites', controller.showFavourites)

// Show top 5 cities
router.get('/top', controller.showTopFive)

// Update a City
router.patch('/:id', admin, controller.update)

// Delete a City
router.delete('/:id', admin, controller.delete)

module.exports = router
