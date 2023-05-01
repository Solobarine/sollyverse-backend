const schema = require ('./validate/country');
const Country = require ('../models/Country');
const likeController = require ('./likeController')
const cityController = require ('./cityController');
const City = require('../models/City');

module.exports = {
  create: async (req, res) => {
    //Validate country
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error.details[0].message})

    // Check if country exists
    const {name} = req.body
    const checkCountry = await Country.findOne({name})
    if (checkCountry) return res.status(400).send({error: 'Country already Exists'})

    //Save Country to DB
   try {
     const country = new Country(req.body)
     await country.save()
     return res.status(200).send({response: 'New Country successfully added'})
   } catch (error) {
    console.log(error)
    return res.status(400).send({error})
   }
  },
  showAll: async (req, res) => {
    //Get all Countries
    const countries = await Country.find({}).select({_id: 1, name: 1})
    if (!countries) return res.status(400).send({error: 'Could not find any Country'})
    // Get one Image from Cities
    const country_ids = countries.map(country => {
      return country._id
    })

    const images = await City.find({}).where('country').in(country_ids).select({country: 1, images: 1})
    if (images.length === 0) return res.status(200).send({countries})
    //Send countries
    return res.status(200).send({countries, images})
  },
  showOne: async (req, res) => {
    // Get a country
    const countryId = req.params.id
    if (!countryId) return res.status(400).send({error: 'Id not found'})

    const country = await Country.findOne({_id: countryId})
    if (!country) return res.status(400).send({error: 'Country not Found'})

    // Find cities and likes
    const cities = await cityController.showCities(country.name)
    const likes = await likeController.showNumberOfLikes(countryId)
    
    // send response
    return res.status(200).send({country, cities, likes})
  },
  update: async (req, res) => {
    // Validate Country
    const validate = schema.validate(req.body)
    if(validate.error) return res.status(400).send({error: validate.error})

    // Query country
    const countryId = req.params.id
    const country = await Country.findOne({_id: countryId})
    if (!country) return res.status(400).send('Country not Found')

    //update country
    try {
      await Country.updateOne({_id: countryId}, req.body)
      //send response
      return res.status(200).send({response: 'Country successfully updated'})
    } catch (error) {
      return res.status(401).send({error})
    }
  },
  delete: async (req, res) => {
    // Query Country
    const countryId = req.params.id
    const country = await Country.findById(countryId)
    if (!country) return res.status(400).send({response: 'Country not Found'})

    //delete country
    country.deleteOne({_id: countryId})

    //send response
    return res.status(200).send({response: 'Country deleted Successfully'})
  }
}
