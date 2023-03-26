const schema = require ('./validate/review');
const Review = require ('../models/Review');
const City = require('../models/City');

module.exports = {
  create: async (req, res) => {
    // validate review
    const validate = schema.valid(req.body)
    if (validate.error) return res.status(400).send({error: validate.error})

    // check if review already exist
    const checkReview = await Review.find({email: req.body.email, destinationId: req.body.destinationId})
    if (checkReview) return res.status(400).send('Review already exists')

    // check if city exists
    const destinationId = req.body.destinationId
    const cityExists = City.findById(destinationId)
    if (!cityExists) return res.status(400).send('City not Found')

    // save review
    const city = new City(req.body)
    await city.save()

    // send response
    res.status(200).send('Review successfully added')
  },
  showAll: async (req, res) => {
    const destinationId = req.params.id
    const reviews = await Review.find({destinationId})
    if (!reviews) return res.status(401).send('Reviews not Found')

    res.status(200).send({reviews})
  },
  showFive: async (req, res) => {
    const destinationId = req.params.id
    const reviews = await Review.find({destinationId}).limit(5)
    if (!reviews) return res.status(404).send('Reviews not Found')

    res.status(200).send({reviews})
  },
  update: async (req, res) => {
    const reviewId = req.params.id
    const reviewExists = await Review.findById(reviewId)
    if (!reviewExists) return res.status(404).send('Review not Found')

    const review = await Review.updateOne({_id: reviewId}, req.body)

    /*const {destinationId, firstName, lastName, email, reviewTitle, review} = req.body
    review.destinationId = destinationId
    review.firstName = firstName
    review.lastName = lastName
    review.email = email
    review.reviewTitle = reviewTitle
    review.review = review
    await review.save()*/
    res.status(200).send('Review updated successfully')
  },
}
