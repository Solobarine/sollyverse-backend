const schema = require ('./validate/city');
const City = require ('../models/City');
const likeController = require ('./likeController');
const saveImages = require('../middleware/saveImages');


module.exports = {
  create: async (req, res) => {
    // Validate city
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send(validate.error)

    // check if city exists
    const cityExists = await City.findOne({name: req.body.name})
    if (cityExists) return res.status(400).send({error: 'City already exists'})

    if (!req.body.country || req.body.city) return res.send('You Incomplete request.')

    const photos = req.body.images.map((image) => {
      const base64 = image.split(';base64,')
      const extension = base64[0].split('/')[1]
      return {extension, base64: base64[1]}
    })

    const convertedImages = saveImages(photos, req.body.country, req.body.name)
    req.body.images = convertedImages

    // Save city
    const city = new City(req.body)
    await city.save()
    console.log(city)
    // send response
    return res.status(200).send({status:'City added successfully', city})
  },
  showAll: async (req, res) => {
    //Query cities
    const cities = await City.find({}).select({_id: 1, name: 1, country: 1, cost: 1})
    if (!cities) return res.status(401).send({error: 'No City currently Avaliable'})

    //send response
    return res.status(200).send(cities)
  },
  showOne: async (req, res) => {
    //Query city
    const cityId = req.params.id
    console.log(cityId)
    const city = await City.findById(cityId)
    console.log(city)
    if (!city) return res.status(401).send({error: 'City could not be Found'})

    //send response
    return res.status(200).send(city)
  },
  showTopFive: async (req, res) => {
    // Query cities
    const topCitiesIds = likeController.mostPopularDestinations

    console.log(topCitiesIds)
    if (!topCitiesIds) return res.status(401).send({error: 'Cities not found'})

    const topCities = topCitiesIds.map(async id => {
      await City.findOne({_id: id}).select({_id: 1, name: 1, cost: 1})
    }) 

    // Send response
    return res.status(200).send(topCities)
  },
  showFiveCities: async (req, res) => {
    const cities = await City.find().select({_id: 1, name: 1, country: 1, images: 1, cost: 1}).limit(5)
    console.log(cities)
    if (cities.length === 0) return res.status(404).send({error: 'Unable to find Cities'})

    return res.status(200).send({cities})
  },
  showFavourites: async (req, res) => {
    const email = req.body.email
    const destinationIds = likeController.favouriteDestinations(email)
    if (!destinationIds) return res.status(401).send({error: 'You currently do not have any favourites'})

    console.log(destinationIds)
    const favouriteCities = destinationIds.map(async destination => {
      await City.find({destinationId: destination}).select({_id: 1, name: 1, country: 1, cost: 1})
    })

    return res.status(200).send({cities: favouriteCities})

  },
  update: async (req, res) => {
    const city = await City.findOne({name: req.body.name})
    if (!city) return res.status(401).send({error: 'City not Found'})

    await City.updateOne({name: req.body.name}, req.body)
    return res.status(200).send({status: 'City updated successfully'})
  },
  delete: async (req, res) => {
    const cityId = req.params.id
    const city = await City.findById(cityId)
    if (!city) return res.status(401).send({error: 'City not Found'})

    City.deleteOne({_id: cityId})
    return res.status(200).send({status:'City removed successfully'})
  },
  showCities: async (name) => {
    const cities = await City.find({ country: name}).select({_id: 1, name: 1, cost: 1, images: 1}).limit(5)
    if (!cities) return null
    return cities
  }
}
