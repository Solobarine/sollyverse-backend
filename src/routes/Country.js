const express = require ('express')
const auth = require ('../middleware/auth')
const admin = require ('../middleware/authAdmin')
const controller = require ('../controllers/countryController')

const router = express.Router()

// Get all Countries
router.get('/', controller.showAll)

// Create a Country
router.post('/', admin, controller.create)

// Get One Country
router.get('/:id', controller.showOne)

// Upate Country
router.patch('/:id', admin, controller.update)

// Delete Country
router.delete('/:id', admin, controller.delete)

module.exports = router
