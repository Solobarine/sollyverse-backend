const schema = require ('./validate/review');
const Review = require ('../models/Review');
const City = require('../models/City');
const Reservation = require('../models/Reservation');

module.exports = {
  create: async (req, res) => {
    // validate review
    // console.log(req.body)
    const validate = schema.validate(req.body)
    // console.log(validate)
    if (validate.error) return res.status(400).send({error: validate.error.details[0].message})

    // check if review already exist
    const checkReview = await Review.findOne({email: req.body.email, destinationId: req.body.destinationId})
    console.log(checkReview, `checkReview`)
    if (checkReview) return res.status(400).send({error:'Review already exists'})
    

    // Check if Reservation Exists
    const reservation = await Reservation.findOne({email: req.body.email})
    if (!reservation) return res.status(400).send({error: 'Make a Reservation to be able to review.'})
    console.log(reservation, `reservation`)

    // check if city exists
    const destinationId = req.body.destinationId
    const cityExists = City.findById(destinationId)
    if (!cityExists) return res.status(400).send({error: 'Cannot make reviews for this City.'})

    // save review
    try {
      const city = new Review(req.body)
      await city.save()

      // send response
      res.status(200).send({message: 'Review successfully added'})
    } catch (error) {
      res.status(500).send({error: error.errors.message})
    }
  },
  showAll: async (req, res) => {
    const destinationId = req.params.id
    const reviews = await Review.find({destinationId})
    if (!reviews) return res.status(401).send({error: 'Reviews not Found'})

    res.status(200).send({reviews})
  },
  showFive: async (req, res) => {
    const destinationId = req.params.id
    const reviews = await Review.find({destinationId}).limit(5)
    if (!reviews) return res.status(404).send({error: 'Reviews not Found'})

    res.status(200).send({reviews})
  },
  showOne: async (req, res) => {
    const city_id = req.body._id
    if (!city_id) return res.status(400).send({error: 'Unable to get City Id'})

    const review = await Review.findOne({email: req.body.email, destinationId: city_id})
    console.log(review)
    if (!review) return res.send({error: false})

    return res.status(200).send({review, status:true})
  },
  update: async (req, res) => {
    const reviewId = req.params.id
    console.log(reviewId)
    if (!reviewId) return res.status(400).send({error: 'Please specify the id in your route'})

    const reviewExists = await Review.findOne({email: req.body.email, _id: reviewId})
    if (!reviewExists) return res.status(404).send({error: 'Review not Found'})

    const review = await Review.updateOne({_id: reviewId}, req.body)

    res.status(200).send({message: 'Review updated successfully'})
  },
}
