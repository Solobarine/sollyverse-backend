const schema = require ('./validate/staff')
const Staff = require ('../models/Staff')

module.exports = {
  create: async (req, res) => {
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error})

    const isStaff = await Staff.fingOne({email: req.body.email})
    if (isStaff) return res.status(400).send({error: 'Staff already exists'})

    const newStaff = await new Staff(req.body)
    await newStaff.save()

    return res.status(200).send({status: 'New Staff successfully added'})
  }
}
