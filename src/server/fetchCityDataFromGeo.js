const fetch = require('node-fetch')
const fetchCityDataFromGeo = async (location) => {
  const res = await fetch(
  `http://api.geonames.org/searchJSON?q=${location}&maxRows=3&username=androzhang`,
  )
  try {
    console.log(location)
    const parsedResult = await res.json()
    return parsedResult
  } catch(e) {
    console.log(e)
  }
}

exports.fetchCityDataFromGeo = fetchCityDataFromGeo
