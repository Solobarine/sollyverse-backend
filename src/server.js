const express = require ('express');
const cors = require ('cors');
const cookie = require ('cookie');
const Multer = require ('multer');


const app = express();

app.listen(3005, () => {
  console.log('Server Connected')
})
