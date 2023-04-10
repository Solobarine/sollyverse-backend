const schema = require ('./validate/country');
const Country = require ('../models/Country');
const likeController = require ('./likeController')
const cityController = require ('./cityController');

module.exports = {
  create: async (req, res) => {
    //Validate country
    const validate = schema.validate(req.body)
    if (validate.error) return res.status(400).send({error: validate.error})

    // Check if country exists
    const {name} = req.body
    const checkCountry = await Country.findOne({name})
    if (checkCountry) return res.status(400).send({error: 'Country already Exists'})
    console.log(checkCountry)

    //Save Country to DB
   try {
     const country = new Country(req.body)
     await country.save()

      //Send response
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

    //Send countries
    return res.status(200).send({countries})
  },
  showOne: async (req, res) => {
    // Get a country
    const countryId = req.params.id
    console.log(countryId)
    const country = await Country.findOne({_id: countryId})
    if (!country) return res.status(400).send({error: 'Country not Found'})
    // Find cities and one image

    const cities = cityController.showCities(country.name)
    const likes = likeController.showNumberOfLikes(countryId)
    console.log(country)
    // send response
    return res.status(200).send({country, cities, likes})
  },
  update: async (req, res) => {
    // // Validate Country
    // const validate = schema.validate(req.body)
    // if(validate.error) return res.status(400).send({error: validate.error})

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
