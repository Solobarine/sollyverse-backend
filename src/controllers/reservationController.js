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
    console.log(error);
    if (error) return res.status(400).send({error})
    const user = await User.findById({_id: req.user._id})
  console.log(user);

    // Check if city exists
    const cityId = req.body.city
    const city = await City.findById({_id: cityId}).populate('country')
    console.log(city);
    if (!city) return res.status(404).send({error: 'City not Found'})

    // save reservation
    const reservation = new Reservation(req.body)
    await reservation.save()
    messageController.createMessageReservation(user._id, user.email, messages.createReservation, city.name, city.country.name, user._id)

    // send response
    res.status(201).send({message: 'Reservation successfully created', reservation})
  },
  showReservations: async (req, res) => {
    //Get reservations
    const reservations = await Reservation.find({user: req.user._id}).populate('city')

    console.log(reservations)

    if (!reservations) return res.status(404).send({error: 'No Reservations Found'})

    //send response
    res.status(200).send({reservations})
  },
  cancel: async (req, res) => {
    // Verify user
    const user = User.findById(req.user)
    if (user.email !== req.body.email) return res.status(400).send({error: 'Access Denied'})
    // Get reservation
    const id = req.params.id
    const reservation = await Reservation.findById(id)
    if (!reservation) return res.status(404).send({error: 'Reservation not Found'})

    // cancel reservation
    const city = await City.findById(reservation.cityId)
    if (!city) return res.status(404).send({error: 'City not Found'})

    reservation.status = 'cancelled'
    await reservation.save()
    messageController.createMessageReservation(user._id, user.email, messages.cancelReservation, city.name, city.country, user._id)

    res.status(200).send({response: 'Reservation successfully cancelled'})
  },
}
