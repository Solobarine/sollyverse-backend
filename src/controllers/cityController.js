const fs = require ('fs')
const path = require ('path')
const schema = require ('./validate/city');
const City = require ('../models/City');
const upload = require ('../middleware/upload');
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

    const country = req.body.country.replaceAll('', '')
    console.log(country)
    const convertedImages = saveImages(req.body.images, country, req.body.name)
    console.log(convertedImages)
    req.body.images = convertedImages

    // save city
    const city = new City(req.body)
    await city.save()
    // send response
    return res.status(200).send({status:'City added successfully'})
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
    const city = await City.findById(cityId)
    if (!city) return res.status(401).send({error: 'City could not be Found'})

    //send response
    return res.status(200).send(city)
  },
  showTopFive: async (req, res) => {
    // Query cities
    const topCitiesIds = likeController.mostPopularDestination

    console.log(topCitiesIds)
    if (!topCitiesIds) return res.status(401).send({error: 'Cities not found'})

    const topCities = topCitiesIds.map(async id => {
      await City.findOne({_id: id}).select({_id: 1, name: 1, cost: 1})
    }) 

    // Send response
    return res.status(200).send(topCities)
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
    const cityId = req.body._id
    const city = await City.findById(cityId)
    if (!city) return res.status(401).send({error: 'City not Found'})

    // const images = city.images
    // const {name, country, description, rating, location, visitors} = req.body
    // city.name = name
    // city.country = country
    // city.description = description
    // city.rating = rating
    // city.location = location
    // city.visitors = visitors
    // city.images = images

    await City.updateOne({_id: cityId}, req.body)
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
    const cities = await City.find({ country: name}).select({_id: 1, name: 1, cost: 1})
    if (!cities) return null
    return cities
  }
}
