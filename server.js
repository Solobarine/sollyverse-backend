const express = require ('express');
const cors = require ('cors');
const cookie = require ('cookie');
const mongoose = require ('mongoose');
 
const user = require ('./src/routes/User')
const city = require ('./src/routes/City')
const country = require ('./src/routes/Country')
const like = require ('./src/routes/Like')
const message = require ('./src/routes/Message')
const reservation = require('./src/routes/Reservation')
const review = require ('./src/routes/Review');
const {json} = require('express');


require('dotenv').config();

//const password = process.env.SECURE_PASSWORD;

//const connectionString = `mongodb+srv://sollyverse:${password}@sollyverse.qr8xevw.mongodb.net/?retryWrites=true&w=majority`
const mongo_url = `mongodb://localhost:27017/`
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

mongoose.connect(mongo_url).catch(() => console.log('Unable to connect.'));

const db = mongoose.connection;

db.on('error',() => {
  console.error.bind(console, "connection error: ")
});

db.once('open', () => {
  console.log('Database Connected')
})


const app = express();
app.use(cors({
  credenials: true
}))

app.use(express.json())

// Add Routes
app.use('/', user)
app.use('/city', city)
app.use('/country', country)
app.use('like', like)
app.use('/message', message)
app.use('/reservations', reservation)
app.use('/review', review)

app.listen(3005, () => {
  console.log('Server Connected on port 3005')
})
