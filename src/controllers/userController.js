const cookie = require ('cookie');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const User = require ('../models/User');
const Admin = require ('../models/Admin');
const Staff = require ('../models/Staff');
const userSchema = require ('./validate/user');
const loginValidate = require ('./validate/loginValidate');
const adminSchema = require ('./validate/admin');
const passwordSchema = require ('./validate/changePassword');
const messageController = require ('./messageController');
const messages = require ('../preparedMessages');
require('dotenv').config();

const key = 'SOLLYVERSE4625877359'

module.exports = {
  create: async(req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      dateOfBirth
    } = req.body

    const validate = userSchema.validate({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      dateOfBirth
    });


    const {error} = validate
    // If validation fails
    if (error) return res.status(400).send({error: error.message})

    // If password and confirm password do not match
    if (req.body.password !== req.body.confirmPassword) return res.status(400).send({error: 'Passwords do not match'})

    // If email already exists
    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send({error: 'User Already Exists'})

    const salt = await bcrypt.genSalt(15)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const nickname = 'Globe Trotter'
    req.body.nickName = nickname
    req.body.password = hashedPassword

    try {
      const user = new User(req.body)
      await user.save()
      messageController.createAccountMessage(user._id, user.email, messages.createAccount, user.firstName)
      
      // Clear password before sending user record
      user.password = ''

      // Create Json web token
      const token = jwt.sign({_id: user._id}, process.env.PRIVATE_KEY)
      res.header('authentication_token', token).status(200).send({status: 'User created successfully', user})
    } catch(error) {
      return res.status(400).send({error})
    }

  },
  login: async (req, res) => {
    // Validate inputs
    const validate = loginValidate.validate(req.body);
    if (validate.error) return res.status(400).send({error: validate.error})
    // Find user
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send({error: 'User not Found'})

    // compare hashed passwords
    const comparePassword = await bcrypt.compare(req.body.password, user.password)
    if (!comparePassword) return res.status(400).send({error: 'Invalid Email or Password'})

    // Create Token
    const token = jwt.sign({_id: user._id}, process.env.PRIVATE_KEY)
    user.password = ''
    // send token
    res.header('authentication_token', token).status(200).send({user}) 
  },
  updateBio: async (req, res) => {
    const id = req.body._id
    const user = await User.findById(id)
    if (!user) return res.status(404).send('User not Found')

    const updateUser = await User.updateOne({_id: id}, req.body)
    res.status(200).send({status: 'Account updated successfully'})
  },
  updatePassword: async (req, res) => {
    const validate = passwordSchema.validate(req.body)

    if (validate.error) return res.status(400).send({error: 'Invalid Passwords'})
  
    const user = User.findById({_id: req.user})

    const salt = await bcrypt.genSalt(15)
    const newHashedPassword = await bcrypt.hash(req.body.newPassword, salt)
    user.password = newHashedPassword
    await user.save()
    messageController.createUpdateMessage(user._id, user.email, messages.updatePassword)

    res.status(200).send({status: 'Password Changed Successfully'})
  },
  delete: async (req, res) => {
    const user = User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('User not Found')

    const verifyPassword = await bcrypt.compare(req.body.password, user.password)
    if (!verifyPassword) return res.status(400).send({error: 'Account Removal Failed'})

    User.deleteOne({email: req.body.email})
    res.status(200).send({status: 'Account Removed Successfully'})
  },
  // METHODS FOR ADMIN
  createAdmin: async (req, res) => {
    const validate = adminSchema.validate(req.body)
    if (!validate) return res.status(400).send({error: validate.error.message})

    const isStaff = await Staff.findOne({email: req.body.email})
    if (!isStaff) return res.status(400).send({error: 'Unauthorized User'})

    const isAdmin = await Admin.findOne({email: req.body.email})
    if (isAdmin) return res.status(400).send({error: 'Admin already Exists'})

    const salt = await bcrypt.genSalt(20)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newAdmin = await new Admin(req.body)
    newAdmin.password = hashedPassword
    newAdmin.save()
    // Create JWT for admin
    const token = jwt.sign({_id: newAdmin._id}, process.env.PRIVATE_KEY)
    newAdmin.password = ''

    return res.header({'admin_auth_token': token}).status(200).send({message: 'Admin created successfully', admin: newAdmin})
  },
  adminLogin: async (req, res) => {
    const validate = loginValidate.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error.message})

    const admin = await Admin.findOne({email: req.body.email})
    if (!admin) return res.status(404).send({error: 'Admin not Found'})

    const comparePassword = await bcrypt.compare(req.body.pasword, admin.password)
    if (!comparePassword) return res.status(400).send({error: 'Invalid username or password'})

    const token = jwt.sign({_id: admin._id}, process.env.PRIVATE_KEY)
    admin.password = ''

    return res.header({'admin_auth_token': token}).status(200).send({admin})
  },
  updateAdmin: async (req, res) => {
    const validate = updateAdminSchema.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error.message})

    const isAdmin = await Admin.findById(req.body._id)
    if (!isAdmin) return res.status(404).send({error: 'Admin not Found'})

    await Admin.updateOne({_id: req.body._id}, req.body)
    return res.status(200).send({status: 'Admin updated successfully'})
  }
}
