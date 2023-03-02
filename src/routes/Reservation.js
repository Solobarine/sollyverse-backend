const express = require ('express')

const router = express.Router()

// Get 5 recent reservations
router.get('/recent')

// Get User reservations
router.get('/')

// Create a Reservation
router.post('/')

// Cancel Reservation
router.delete('/cancel/:id')
