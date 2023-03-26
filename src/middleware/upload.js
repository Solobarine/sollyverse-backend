const multer = require ('multer')
const storage = require('./saveImages')

const upload = multer({storage: storage, limits: {fileSize: 2500009}})

module.exports = upload
