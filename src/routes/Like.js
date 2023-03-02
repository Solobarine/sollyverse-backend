const express = require ('express')

const router = express.Router()

// Post a Like
router.post('/')

// Get all Likes
router.get('/:id')

// Cancel Like
router.delete('/delete/:id')
