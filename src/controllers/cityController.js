const schema = require ('./validate/city');
const City = require ('../models/City');
const storeImages = require ('../middleware/saveImages');
const upload = require ('../middleware/upload');
const likeController = require ('./likeController');

module.exports = {
  create: async (req, res) => {
    // Validate city
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send(validate.error)
    // check if city exists
    const cityExists = await City.findOne({name: req.body.name})
    if (cityExists) return res.status(400).send('City already exists')

    let imagePath = []
    req.file.foreach(() => {
      const saveImage = storeImages(req.body.country, req.body.city)
      upload(saveImage).single('file')
      const filePath = `${req.protocol}://${req.host}/${req.file.path}`
      console.log(filePath)
      imagePath.push(filePath)
    })
    // save city
    const city = new City(req.body)
    city.images = imagePath
    city.save()
    // send response
    res.status(400).send('City added successfully')
  },
  showAll: async (req, res) => {
    //Query cities
    const cities = await City.find({})
    if (!cities) return res.status(401).send('No City currently Avaliable')

    //send response
    res.status(200).send(countries)
  },
  showOne: async (req, res) => {
    //Query city
    const cityId = req.params.id
    const city = await City.findById(cityId)
    if (!city) return res.status(401).send('City could not be Found')

    //send response
    res.status(200).send(city)
  },
  showTopFive: async (req, res) => {
    //Query cities
    const topCitiesIds = Object.keys(likeController.mostPopularDestinations())
    if (!topCitiesIds) return res.status(401).send('Cities not found')

    const topCities = topCitiesIds.map(async id => {
      await City.find({_id: id})
    }) 

    //send response
    res.status(200).send(topCities)
  },
  showFavourites: async (req, res) => {
    const email = req.params.email
    const destinationIds = likeController.favouriteDestinations(email)
    if (!destinationIds) return res.status(404).send('You currently do not have any favourites')

    console.log(destinationIds)
    const favouriteCities = destinationIds.map(async destination => {
      await City.find({destinationId: destination})
    })

    res.status(200).send({favouriteCities})

  },
  update: async (req, res) => {
    const cityId = req.params.id
    const city = await City.findById(cityId)
    if (!city) return res.status(401).send('City not Found')

    const images = city.images
    const {name, country, description, rating, location, visitors} = req.body
    city.name = name
    city.country = country
    city.description = description
    city.rating = rating
    city.location = location
    city.visitors = visitors
    city.images = images
    await city.save()
    res.status(200).send('City updated successfully')
  },
  delete: async (req, res) => {
    const cityId = req.params.id
    const city = await City.findById(cityId)
    if (!city) return res.status(401).send('City not Found')

    City.deleteOne({_id: cityId})
    res.status(200).send('City removed successfully')
  }
}
