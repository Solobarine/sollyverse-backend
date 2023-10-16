const fs = require ('fs')

const saveImages = (images, country, city) => {
  let directory = []
  images.map((image, index) => {
    const filePath = `./public/countries/${country}/${city}`
    const imagePath = `/countries/${country}/${city}/${city}${index}.${image.extension}`
    fs.mkdirSync(filePath,{recursive: true},(err) => {if (err) console.log(err)})
    fs.writeFileSync( `./public/countries/${country}/${city}/${city}${index}.${image.extension}`, image.base64,{encoding: 'base64'}, function (err) {
      if (err) {
        console.log(err)
      }
    })
    return directory.push(imagePath)
  })
  return directory
}

module.exports = saveImages