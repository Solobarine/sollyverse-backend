const express = require ('express');
const cors = require ('cors');
const cookie = require ('cookie');
const Multer = require ('multer');
const mongoose = require ('mongoose');
require('dotenv').config();

const password = process.env.SECURE_PASSWORD;

const connectionString = `mongodb+srv://sollyverse:${password}@sollyverse.qr8xevw.mongodb.net/?retryWrites=true&w=majority`
const whitelist = [process.env.DEVELOPMENT_ADDRESS, process.env.PRODUCTION_ADDRESS]
const corsOption = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

mongoose.connect(connectionString).catch(() => console.log('Unable to connect.'));

const db = mongoose.connection;

db.on('error',() => {
  console.error.bind(console, "connection error: ")
});

db.once('open', () => {
  console.log('Database Connected')
})


const app = express();
app.use(cors(corsOption))

app.listen(3005, () => {
  console.log('Server Connected')
})
