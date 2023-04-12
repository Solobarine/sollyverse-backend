const multer = require ('multer')

const uploadImage = (storage) => {
  const upload = multer({storage: storage, limits: {fileSize: 2500009}})
  return upload
}

module.exports = uploadImage
