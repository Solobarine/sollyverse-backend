const express = require ('express')

const router = express.Router()

// Get all Countries
router.get('/')

// Create a Country
router.post('/')

// Get One Country
router.get('/country/:id')

// Upate Country
router.put('/country/:id')

// Delete Country
router.delete('/country/:id')
