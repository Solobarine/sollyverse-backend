const schema = require ('./validate/city');
const City = require ('../models/City');
const upload = require ('../middleware/upload');
const likeController = require ('./likeController');

module.exports = {
  create: async (req, res) => {
    // Validate city
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send(validate.error)

    // check if city exists
    const cityExists = await City.findOne({name: req.body.name})
    if (cityExists) return res.status(400).send({error: 'City already exists'})

    // save city
    const city = new City(req.body)
    city.save()
    // send response
    res.status(400).send({status:'City added successfully'})
  },
  showAll: async (req, res) => {
    //Query cities
    const cities = await City.find({}).select({_id: 1, name: 1, country: 1, cost: 1})
    if (!cities) return res.status(401).send({error: 'No City currently Avaliable'})

    //send response
    res.status(200).send(countries)
  },
  showOne: async (req, res) => {
    //Query city
    const cityId = req.params.id
    const city = await City.findById(cityId)
    if (!city) return res.status(401).send({error: 'City could not be Found'})

    //send response
    res.status(200).send(city)
  },
  showTopFive: async (req, res) => {
    //Query cities
    const topCitiesIds = Object.keys(likeController.mostPopularDestinations())
    if (!topCitiesIds) return res.status(401).send({error: 'Cities not found'})

    const topCities = topCitiesIds.map(async id => {
      await City.find({_id: id})
    }) 

    //send response
    res.status(200).send(topCities)
  },
  showFavourites: async (req, res) => {
    const email = req.params.email
    const destinationIds = likeController.favouriteDestinations(email)
    if (!destinationIds) return res.status(404).send({error: 'You currently do not have any favourites'})

    console.log(destinationIds)
    const favouriteCities = destinationIds.map(async destination => {
      await City.find({destinationId: destination}).select({_id: 1, name: 1, country: 1, cost: 1})
    })

    res.status(200).send({cities: favouriteCities})

  },
  update: async (req, res) => {
    const cityId = req.body._id
    const city = await City.findById(cityId)
    if (!city) return res.status(401).send({error: 'City not Found'})

    const images = city.images
    const {name, country, description, rating, location, visitors} = req.body
    city.name = name
    city.country = country
    city.description = description
    city.rating = rating
    city.location = location
    city.visitors = visitors
    city.images = images


    await City.updateOne({_id: cityId}, req.body)
    res.status(200).send({status: 'City updated successfully'})
  },
  delete: async (req, res) => {
    const cityId = req.params.id
    const city = await City.findById(cityId)
    if (!city) return res.status(401).send({error: 'City not Found'})

    City.deleteOne({_id: cityId})
    res.status(200).send({status:'City removed successfully'})
  },
  showCities: async (name) => {
    const cities = await City.find({ country: name}).select({_id, name, cost})
    if (!cities) return null
    return cities
  }
}
