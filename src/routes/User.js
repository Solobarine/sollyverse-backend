const express = require ('express')
const auth = require ('../middleware/auth')
const admin = require ('../middleware/authAdmin')
const controller = require ('../controllers/userController')
const staffController = require ('../controllers/staffController')

const router = express.Router()

router.post('/login', controller.login)

router.post('/admin/login', admin, controller.adminLogin)

router.post('/register', controller.create)

router.post('/admin/register', admin, controller.createAdmin)

router.post('/admin/staff/create', staffController.create)

router.put('/update', auth, controller.updateBio)

router.put('/admin/update', admin, controller.updateAdmin)

router.delete('/delete', auth, controller.delete)

module.exports = router
