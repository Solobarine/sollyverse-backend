const multer = require ('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/countries/${country}/${city}`)
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

module.exports = storage
