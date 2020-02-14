// Cors for cross origin allowance
const path = require('path')
const {fetchCityDataFromGeo} = require('./fetchCityDataFromGeo')
const {fetchDataFromDarkSky} = require('./fetchDataFromDarkSky')
const {fetchPixabay} = require('./fetchPixabay')
const cors =require('cors');
// Require Express to run server and routes
const express = require('express');
// Dependencies
const bodyParser = require('body-parser');

// store trip date
let tripData = []

// Start up an instance of app
const app = express();
app.use(cors());
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Initialize the main project folder
app.use(express.static('dist'))

// Setup Server
const port = 8080
const server = app.listen(port, listening)

function listening() {
  console.log('Travel app listening on port 8080!')
}
//GET route to return the projectData object

app.post('/getDestination', async (req, res) => {
  const {location, date, futureForecast} = req.body;
  const cityData = await fetchCityDataFromGeo(location);
  //console.log(cityData);
  const responseData = {};
  responseData.geo =  cityData.geonames[0];
  const {lat, lng} = cityData.geonames[0];
  const weekWeather = await fetchDataFromDarkSky(lat, lng, date, futureForecast);
  responseData.weather = weekWeather;
  const pic = await fetchPixabay(location);
  responseData.pic = pic;
  tripData.push(responseData);
  console.log(tripData);
  res.status(200).send(responseData)
})
app.post('/test', async (req, res) => {
  res.status(200).send({
    value: true
  })
})
// //POST route to receive data
// app.post('/add',function(req, res){
//     newEntry = {
//      date: req.body.date,
//      temp: req.body.temp,
//      content: req.body.content
//     }
//     projectData.push(newEntry)
//     console.log(projectData)
//
// })
module.exports = app
