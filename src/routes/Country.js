const express = require ('express')
const auth = require ('../middleware/auth')
const admin = require ('../middleware/authAdmin')
const controller = require ('../controllers/countryController')

const router = express.Router()

// Get all Countries
router.get('/', auth, controller.showAll)

// Create a Country
router.post('/', admin, controller.create)

// Get One Country
router.get('/country/:id', controller.showOne)

// Upate Country
router.put('/country/:id', admin, controller.update)

// Delete Country
router.delete('/country/:id', admin, controller.delete)

module.exports = router
