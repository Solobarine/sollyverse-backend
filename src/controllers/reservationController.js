const City = require ('../models/City')
const Reservation = require('../models/Reservation')
const User = require('../models/User')
const schema = require ('./validate/reservation')
const messages = require ('../preparedMessages')
const messageController = require ('./messageController')

module.exports = {
  create: async (req, res) => {
    // Validate reservation
    const validate = schema.validate(req.body)
    const {error} = validate
    if (error) return res.status(400).send({error})

    // Check user
    const user = User.findById(req.user)
    // Check if city exists
    const cityId = req.body.id
    const cityExists = await City.findById(cityId)
    if (!cityExists) return res.status(404).send('City not Found')

    // save reservation
    const reservation = new Reservation(req.body)
    await reservation.save()
    messageController.createMessageReservation(user._id, user.email, messages.createReservation, cityExists.name, cityExists.country, user._id)

    // send response
    res.status(200).send('Reservation successfully created')
  },
  showReservation: async (req, res) => {
    //Verify user
    const user = User.findById(req.user)
    if (user.email !== req.body.email) return res.status(400).send('Access Denied')

    //Get reservations
    const reservations = await Reservation.find({email: user.email})
    if (!reservations) return res.status(404).send('No Reservations Found')

    //send response
    res.status(200).send({reservations})
  },
  cancel: async (req, res) => {
    // Verify user
    const user = User.findById(req.user)
    if (user.email !== req.body.email) return res.status(400).send('Access Denied')
    // Get reservation
    const id = req.params.id
    const reservation = await Reservation.findById(id)
    if (!reservation) return res.status(404).send('Reservation not Found')

    // cancel reservation
    const city = await City.findById(reservation.cityId)
    if (!city) return res.status(404).send('City not Found')

    reservation.status = 'cancelled'
    await reservation.save()
    messageController.createMessageReservation(user._id, user.email, messages.cancelReservation, city.name, city.country, user._id)

    res.status(200).send('Reservation successfully cancelled')
  },
}
