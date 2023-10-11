const Like = require('../models/Like')
const City = require('../models/City')
const schema = require ('./validate/like')

module.exports = {
  create: async (req, res) => {
    // Validate like
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error})

    const city = await City.findOne({_id: req.body.city})
    console.log(city);
    if (!city) return res.status(404).send({error: 'This City does not exist'})

    const checkLike = await Like.findOne({user: req.body.user, city: req.body.city})
    .populate({
      path: 'city',
      select: 'name'
    })
    .populate({
      path:'user',
      select: 'email'
    })

    if (checkLike) {
      await Like.deleteOne({email: req.body.email, city: req.body.city})
      city.likes -= 1
      return await city.save()
    }

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
  showUserLikes: async (userId) => {
    const likes = await Like.find({user: userId})
    console.log(likes);
    if (likes.length === 0) return []

    return likes
  },
  showNumberOfLikes: async (id) => {
    const numberOfLikes = await Like.countDocuments({city: id})
    if (!numberOfLikes) return 0
    
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
  favouriteDestinations: async (req, res) => {
    console.log(req.user);
    const favourites = await Like.find({user: req.user._id}).populate({
      path: 'city',
      select: 'images name country _id cost',
      populate: {
        path: 'country',
        select: 'name'
      }
    })
    if (!favourites) return res.status(404).send({error: 'No Favourites Found'})
    return res.status(200).send({favourites})
  }
}
