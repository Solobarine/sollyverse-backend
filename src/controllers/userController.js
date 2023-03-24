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

module.exports = {
  create: async(req, res) => {
    console.log(req.body)
    if (req.body) {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      dateOfBirth
    } = JSON.parse(req.body)

    const validate = userSchema.validate({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      dateOfBirth
    });
    } else return res.status(400).send({error: 'Inputs cannot be empty'})

    const {error} = validate
    // If validation fails
    if (error == null) return res.status(400).send({error})

    // If password and confirm password do not match
    if (req.body.password !== req.body.confirmPassword) return res.status(400).send({error: 'Passwords do not match'})

    // If email already exists
    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send({error: 'User Already Exists'})

    const salt = await bcrypt.genSalt(15)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const nickname = 'Globe Trotter'

    const user = new User({firstName, lastName, email, hashedPassword, phoneNumber, dateOfBirth, gender,
      nickname,countryOfOrigin, addressOne, addressTwo, city, state, countryOfResidence, zipCode})
    await user.save()
    messageController.createAccountMessage(user._id, user.email, messages.createAccount, user.firstName)
    // Clear password before sending user record
    user.password = ''

    // Create Json web token
    const token = jwt.sign({_id: user._id}, process.env.PRIVATE_KEY)
    res.header('authentication_token', token).status(200).send({status: 'User created successfully', user})
  },
  login: async (req, res) => {
    // Validate inputs
    const validate = loginValidate(req.body);
    if (validate.error) return res.status(400).send({error: validate.error})
    // Find user
    const user = User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('User not Found')

    // compare hashed passwords
    const comparePassword = await bcrypt.compare(req.body.password, user.password)
    if (!comparePassword) return res.status(400).send('Invalid Email or Password')

    // Create Token
    const token = jwt.sign({_id: user._id}, process.env.PRIVATE_KEY)
    user.password = ''
    // send token
    res.header('authentication_token', token).status(200).send({user}) 
  },
  updateBio: async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) return res.status(404).send('User not Found')

    const {firstName, lastName, email, phoneNumber,addressOne, addressTwo, city, state, zipCode, countryOfResidence} = req.body
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.phoneNumber = phoneNumber
    user.addressOne = addressOne
    user.addressTwo = addressTwo
    user.city = city
    user.state = state
    user,zipCode = zipCode
    user.countryOfResidence = countryOfResidence
    await user.save()
    messageController.createUpdateMessage(user._id, user.email, messages.updateAccount)

    res.status(200).send('Account updated successfully', user)
  },
  updatePassword: async (req, res) => {
    const validate = passwordSchema.validate(req.body)

    if (validate.error) return res.status(400).send('Invalid Passwords')
  
    const user = User.findById({_id: req.user})

    const salt = await bcrypt.genSalt(15)
    const newHashedPassword = await bcrypt.hash(req.body.newPassword, salt)
    user.password = newHashedPassword
    await user.save()
    messageController.createUpdateMessage(user._id, user.email, messages.updatePassword)

    res.status(400).send('Password Changed Successfully')
  },
  delete: async (req, res) => {
    const user = User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('User not Found')

    const verifyPassword = await bcrypt.compare(req.body.password, user.password)
    if (!verifyPassword) return res.status(400).send('Account Removal Failed')

    User.deleteOne({email: req.body.email})
    res.status(200).send('Account Removed Successfully')
  },
  // METHODS FOR ADMIN
  createAdmin: async (req, res) => {
    const validate = adminSchema.validate(req.body)
    if (!validate) return res.status(400).send({error: validate.error})

    const isStaff = await Staff.findOne({email: req.body.email})
    if (!isStaff) return res.status(400).send({error: 'Unauthorized User'})

    const isAdmin = await Admin.findOne({email: req.body.email})
    if (isAdmin) return res.status(400).send({error: 'Admin alreadyy Exists'})

    const salt = await bcrypt.genSalt(20)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newAdmin = await new Admin(req.body)
    newAdmin.password = hashedPassword
    newAdmin.save()
    return res.status(200).send({message: 'Admin created successfully', admin: newAdmin})
  },
  adminLogin: async (req, res) => {
    const validate = loginValidate.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error})

    const admin = await Admin.findOne({email: req.body.email})
    if (!admin) return res.status(404).send({error: 'Admin not Found'})

    const comparePassword = await bcrypt.compare(req.body.pasword, admin.password)
    if (!comparePassword) return res.status(400).send({error: 'Invalid username or password'})

    const token = jwt.sign({_id: admin._id}, process.env.PRIVATE_KEY)
    admin.password = ''

    return res.header({'admin_auth_token': token}).send({admin})
  },
  updateAdmin: async (req, res) => {
    const validate = updateAdminSchema.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error})

    const isAdmin = await Admin.findById(req.body._id)
    if (!isAdmin) return res.status(404).send({error: 'Admin not Found'})

    await Admin.update({_id: req.body._id}, req.body)
    return res.status(200).send({status: 'Admin updated successfully'})
  }
}
