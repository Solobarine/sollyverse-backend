const express = require ('express')
const auth = require ('../middleware/auth')
const controller = require ('../controllers/reservationController')

const router = express.Router()

// Get 5 recent reservations
router.get('/recent')

// Get User reservations
router.get('/', auth, controller.showReservation)

// Create a Reservation
router.post('/', auth, controller.create)

// Cancel Reservation
router.delete('/cancel/:id', auth, controller.cancel)

module.exports = router
