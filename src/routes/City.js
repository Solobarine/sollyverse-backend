const express = require ('express')
const auth = require ('../middleware/auth')
const admin = require ('../middleware/authAdmin')
const controller = require ('../controllers/cityController')

const router = express.Router()

// Get all Cities
router.get('/', auth, controller.showAll)

// Create a City
router.post('/admin', admin, controller.create)

// Get a City
router.get('/:id', auth, controller.showOne)

// Update a City
router.put('/admin/update/:id', admin, controller.update)

// Delete a City
router.delete('/admin/delete/:id', admin, controller.delete)

module.exports = router
