const Like = require('../models/Like')
const City = require('../models/City')
const schema = require ('./validate/like')

module.exports = {
  create: async (req, res) => {
    // Validate like
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error})

    // Check if like exists

    const checkLike = await Like.findOne({email: req.body.email, destinationId: req.body.destinationId})
    const city = await City.findOne({_id: req.body.destinationId})

    if (!city) return res.status(404).send({error: 'This City does not exist'})

    if (checkLike) {
      await Like.deleteOne({email: req.body.email, destinationId: req.body.destinationId})
      city.likes -= 1
      return await city.save()
    }
    console.log(checkLike)

    // save likes
    const like = new Like(req.body)
    await like.save()
    city.likes += 1
    return await city.save()
  },
  delete: async (req, res) => {
    // Check if like exists
    const checkLike = await Like.find({email: req.body.email, destinationId: req.body.destinationId})
    if (!checkLike) return res.status(400).send({error: 'Unable to unlike'})

    // Remove like
    await Like.deleteOne({email: req.body.email, destinationId: req.body.destinationId})
  },
  showUserLikes: async (req, res) => {
    const likes = await Like.find({email: req.body.email})
    if (likes.length === 0) return res.status(404).send({error: 'You do not have any likes.'})

    return res.status(200).send((likes))
  },
  showNumberOfLikes: async (id) => {
    const numberOfLikes = await Like.countDocuments({destinationId: id})
    if (!numberOfLikes) return null
    
    return numberOfLikes
  },
  mostPopularDestinations: async () => {
    const popularDestinations =  await Like.aggregate([{
      $group: {
        id: '$_id',
        count: {$sum: 1}
      }
    }])
    return popularDestinations
  },
  favouriteDestinations: async (email) => {
    const favourites = await Like.find({email}).select({destinationId: 1})
    if (!favourites) return null
    return favourites
  }
}
