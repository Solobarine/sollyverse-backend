const fs = require ('fs')

const saveImages = (images, country, city) => {
  let directory = []
  images.map((image, index) => {
    const filePath = `./public/countries/${country}/${city}`
    const imagePath = `/coutries/${country}/${city}${index}`
    fs.mkdir(filePath,{recursive: true},(err) => {if (err) console.log(err)})
    fs.writeFile( `./public/countries/${country}/${city}${index}`, image, function (err) {
      if (err) {
        console.log(err)
      }
    })
    return directory.push(imagePath)
  })
  return directory
}

module.exports = saveImages