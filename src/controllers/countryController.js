const schema = require ('./validate/country');
const Country = require ('../models/Country');
const {off} = require('../models/Country');

module.exports = {
  create: async (req, res) => {
    //Validate country
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error})

    // Check if country exists
    const {name} = req.body.name
    const checkCountry = Country.findOne({name})
    if (checkCountry) return res.status(401).send({error: 'Country already Exists'})

    //Save Country to DB
    const country = new Country(req.body)
    country.save()

    //Send response
    res.status(200).send('New Country created')
  },
  showAll: async (req, res) => {
    //Get all Countries
    const countries = await Country.find({}).select({_id, name})
    if (!countries) return res.status(400).send('Could not find any Country')
    // Get one Image from Cities

    //Send countries
    res.status(200).send({countries})
  },
  showOne: async (req, res) => {
    // Get a country
    const countryId = req.params.id
    const country = await Country.findOne({_id: countryId})
    if (!country) return res.status(400).send('Country not Found')
    // Find cities and one image

    // send response
    res.status(400).send({country})
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
    const {name, description, capital, continent, officialLanguage, location, likes} = req.body
    country.name = name
    country.description = description
    country.capital = capital
    country.continent = continent
    country.officialLanguage = officialLanguage
    country.location = location
    country.likes = likes
    await country.save()

    //send response
    res.status(200).send('Country successfully updated')
  },
  delete: async (req, res) => {
    // Query Country
    const countryId = req.params.id
    const country = await Country.findById(countryId)
    if (!country) return res.status(400).send('Country not Found')

    //delete country
    country.deleteOne({_id: countryId})

    //send response
    res.status(200).send('Couontry deleted Successfully')
  }
}
