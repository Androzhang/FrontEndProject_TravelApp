const fetch = require('node-fetch')
const fetchDataFromDarkSky = async (lat, lng, date, futureForecast) => {
  const res = await fetch(
  `https://api.darksky.net/forecast/d68871727a8466e625cf48802448d9cb/${lat},${lng}${futureForecast ? `,${date}` : ''}?exclude=hourly,minutely,flags`,
  )
  try {
    const parsedResult =await res.json()
    console.log(parsedResult)
    return parsedResult
  } catch(e) {
    console.log(e)
  }
}

exports.fetchDataFromDarkSky = fetchDataFromDarkSky
