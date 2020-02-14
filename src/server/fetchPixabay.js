const fetch = require('node-fetch')
const fetchPixabay = async (cityName) => {
try {
  const res = await fetch(
  `https://pixabay.com/api/?key=15226724-57641b321d43c37e8bca48804&q=${cityName}`,
  )
  const parsedResult = res.json()
  return parsedResult
} catch(e) {
  console.log(e)
}
}

exports.fetchPixabay = fetchPixabay
