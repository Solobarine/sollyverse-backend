const Like = require('../models/Like');
const schema = require ('./validate/like');

module.exports = {
  create: async (req, res) => {
    // Validate like
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error})

    // Check if like exists
    const checkLike = await Like.find({email: req.body.email, destinationId: req.body.destinationId})
    if (checkLike) return res.status(400).send('You already liked this destination')

    // save likes
    const like = new Like(req.body)
    await like.save()
  },
  delete: async (req, res) => {
    // Check if like exists
    const checkLike = await Like.find({email: req.body.email, destinationId: req.body.destinationId})
    if (!checkLike) return res.status(400).send('Unable to unlike')

    // Remove like
    await Like.deleteOne({email: req.body.email, destinationId: req.body.destinationId})
  },
  showNumberOfLikes: async (id) => {
    const numberOfLikes = await Like.aggregate().count(id)
    if (!numberOfLikes) return null
    
    return numberOfLikes
  },
  mostPopularDestinations: async () => {
    // const popularDestinations =  await Like.aggregate([{
    //   $group: {
    //     id: '$_id',
    //     count: {$sum: 1}
    //   }
    // }])
    // return popularDestinations
  },
  favouriteDestinations: async (email) => {
    const favourites = await Like.find({email}).select('destinationId')
    if (!favourites) return null
    return favourites
  }
}
