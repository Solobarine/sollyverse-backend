const express = require ('express')
const auth = require ('../middleware/auth')
const admin = require ('../middleware/authAdmin')
const controller = require ('../controllers/userController')
const staffController = require ('../controllers/staffController')
const loginWithToken = require('../middleware/loginWithToken')
const loginWithTokenAdmin = require ('../middleware/loginWithTokenAdmin')

const router = express.Router()

/* User API Routes */

// User Login
router.post('/login', controller.login)

// User Registration
router.post('/register', controller.create)

// Login With token
router.post('/verify-token', loginWithToken)

// Update User details
router.put('/update', auth, controller.updateBio)

// Cancel User Account
router.delete('/delete', auth, controller.delete)


/* Admin API Routes */

// Admin Login
router.post('/admin/login', controller.adminLogin)

// Admin Token Login
router.post('/admin/token/login', loginWithTokenAdmin)

// Admin Registration
router.post('/admin/register', controller.createAdmin)

// Register Staff
router.post('/admin/staff/create', admin, staffController.create)

// Update Admin Bio
router.put('/admin/update', admin, controller.updateAdmin)

module.exports = router
