const bcrypt = require('bcrypt')
const schema = require ('./validate/staff')
const Staff = require ('../models/Staff')

module.exports = {
  create: async (req, res) => {
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error.details[0]})

    const isStaff = await Staff.findOne({email: req.body.email})
    if (isStaff) return res.status(400).send({error: 'Staff already exists'})

    // Hash Staff Password
    const salt = await bcrypt.genSalt(15)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPassword

    const newStaff = await new Staff(req.body)
    await newStaff.save()

    return res.status(200).send({status: 'New Staff successfully added', newStaff})
  }
}
