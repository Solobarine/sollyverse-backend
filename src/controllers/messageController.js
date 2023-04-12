const schema = require ('./validate/message')
const Message = require ('../models/Message')
const User = require ('../models/User')

module.exports = {
  create: async (req, res) => {
    // Validate message
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error})

    // validate receiver
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(404).send('User not Found')

    // save message
    const message = new Message(req.body)
    await message.save()

    // send response
    res.status(200).send('Message created successfully')
  },
  createMessageReservation: async (receiver, email, content, city, country, id) => {
    const description = content(city, country, id)
    const message = new Message({receiver, email, message: description})
    await message.save()
    return 'Message created successfully'
  },
  createAccountMessage: async (receiver, email, content, firstName) => {
    const description = content(firstName)
    const message = new Message({receiver, email, message: description})
    await message.save()
    return 'Mesage created successfully'

  },
  createUpdateMessage: async (receiver, email, content) => {
    const message = await new Message({receiver, email, message: content})
    await message.save()
    return 'Message created successfully'
  },
  view: async (req, res) => {
    //Validate User
    const user = await User.findbyId(req.user)
    if (!user) return res.status(404).send('Access Denied')

    //Get messages
    const messages = await Message.find({email: user.email})
    if (!messages) return res.status(404).send('Messages not Found')

    //send response
    res.status(200).send(messages)
  },
  markAsRead: async (req, res) => {
    // Get message
    const id = req.params.id
    const message = await Message.findById(id)
    if (!message) return res.status(404).send('Message not Found')

    // update status
    message.status = 'opened'
    await message.save()
  }
}
