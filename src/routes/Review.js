const express = require ('express')

const router = express.Router()

// Post a Review
router.post('/')

// Show Reviews
router.get('/city/:id')

// Update Review
router.put('/update/:id')

// Delete Review
router.delete('/delete/:id')
