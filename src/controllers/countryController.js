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
    const checkCountry = await Country.findOne({name: req.body.name})
    if (checkCountry) return res.status(400).send({error: 'Country already Exists'})

    //Save Country to DB
   try {
     const country = new Country(req.body)
     await country.save()
     return res.status(201).send({message: 'New Country successfully added', country})
   } catch (error) {
    console.log(error)
    return res.status(400).send({error})
   }
  },
  showAll: async (req, res) => {

    //Get all Countries
    const countries = await Country.find({}).select({name: 1, _id: 1, imageUrl: 1})

    console.log(countries);

    if (!countries) return res.status(404).send({error: 'Countries not Found'})

    //Send countries
    return res.status(200).send({countries})
  },
  showOne: async (req, res) => {
    // Get a country
    const countryId = req.params.id
    console.log(countryId)
    if (!countryId) return res.status(400).send({error: 'Id not found'})

    const country = await Country.findOne({_id: countryId})
    if (!country) return res.status(400).send({error: 'Country not Found'})

    // Find cities and likes
    const cities = await cityController.showCities(countryId)
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

    try {
      const country = await Country.findandUpdateOne({_id: countryId}, req.body)
      if (!country) return res.status(400).send('Country not Found')
      return res.status(200).send({response: 'Country successfully updated'})
    } catch (error) {
      return res.status(401).send({error})
    }
  },
  delete: async (req, res) => {
    // Query Country
    const countryId = req.params.id
    const country = await Country.findById(countryId)
    if (!country) return res.status(400).send({message: 'Country not Found'})

    //delete country
    Country.deleteOne({_id: countryId})

    //send response
    return res.status(200).send({message: 'Country deleted Successfully'})
  }
}
