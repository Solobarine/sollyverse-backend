const schema = require ('./validate/city')
const City = require ('../models/City')
const Like = require('../models/Like')
const Country = require('../models/Country')
const uploadToSupabase = require('../middleware/supabase')

module.exports = {
  create: async (req, res) => {

    // Validate city
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send(validate.error)
    
    
    const countryExists = await Country.findOne({_id: req.body.country})
    if (!countryExists) return res.status(404).send({error: 'Country not Found. City cannot be Created'})
    // check if city exists
    const cityExists = await City.findOne({name: req.body.name})
    if (cityExists) return res.status(400).send({error: 'City already exists'})
    
    const images = await uploadToSupabase(req.files, req.body.name, req.body.country)
    console.log(images);
    if (!images[0]) return res.status(400).send({error: 'Unable to upload Images'})
    // Save city
    // Append Image URLs to Request Body
    req.body.images = await images
    const city = new City(req.body)
    await city.save()
    console.log(city)
    // send response
    return res.status(200).send({status:'City added successfully', city})
  },
  showAll: async (req, res) => {
    //Query cities
    const cities = await City.find({}).select({_id: 1, name: 1, country: 1, cost: 1, images: 1})
    if (!cities) return res.status(401).send({error: 'No City currently Avaliable'})

    //send response
    return res.status(200).send(cities)
  },
  showOne: async (req, res) => {
    //Query city
    const cityId = req.params.id
    console.log(cityId)
    const city = await City.findById({_id: cityId})
    console.log(city)
    if (!city) return res.status(401).send({error: 'City could not be Found'})

    //send response
    return res.status(200).send({city})
  },
  showTopFour: async (req, res) => {
    // Query cities
    const topCities = await Like.aggregate([
      {
        $group: {
          _id: '$city',
          totalLikes: {$sum: 1},
        },
      },
      {
        $sort: { totalLikes: -1}
      },
      {
        $limit: 4
      },
      {
        $lookup: {
          from: 'cities',
          localField: '_id',
          foreignField: '_id',
          as: 'cityInfo',
        },
      },
      {
        $unwind: '$cityInfo',
      },
      {
        $lookup: {
          from: 'countries',
          localField: 'cityInfo.country',
          foreignField: '_id',
          as: 'countryInfo',
        },
      },
      {
        $unwind: '$countryInfo',
      },
      {
        $project: {
          _id: '$cityInfo._id',
          cityName: '$cityInfo.name',
          cost: '$cityInfo.cost',
          images: '$cityInfo.images',
          country: {
            _id: '$countryInfo._id',
            name: '$countryInfo.name'
          },
          totalLikes: 1,
        },
      },
    ])
    
    if (!topCities) {
      topCities = await City.aggregate([
      { $sample: { size: 4 } }
    ])
    }

    if (!topCities) return res.status(401).send({error: 'Cities not found'})

    // Send response
    return res.status(200).send(topCities)
  },
  showFiveCities: async (req, res) => {
    const cities = await City.aggregate([
      { $sample: { size: 5 } }
    ])
    console.log(cities)
    if (cities.length === 0) return res.status(404).send({error: 'Unable to find Cities'})

    return res.status(200).send({cities})
  },
  update: async (req, res) => {
    const id = req.params.id
    const city = await City.findandUpdateOne({_id: id}, req.body)
    if (!city) return res.status(401).send({error: 'City not Found'})
    return res.status(200).send({status: 'City updated successfully', city})
  },
  delete: async (req, res) => {
    const cityId = req.params.id
    const city = await City.findById(cityId)
    if (!city) return res.status(401).send({error: 'City not Found'})

    City.deleteOne({_id: cityId})
    return res.status(200).send({status:'City removed successfully'})
  },
  showCities: async (countryId) => {
    const cities = await City.find({country: countryId}).select({_id: 1, name: 1, cost: 1, images: 1}).limit(5)
    if (!cities) return null
    return cities
  }
}
