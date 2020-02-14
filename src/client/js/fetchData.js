import 'babel-polyfill'
function onSubmit(event) {
  const datepicker = document.getElementById('search-trip-date');
  const location = document.getElementById('search-trip-location').value;
  let selectedTime = new Date(document.getElementById('search-trip-date').value);
  const currentTime = new Date();
  const differenceTime = selectedTime.getTime() - currentTime.getTime();
  const dateOffset = (24*60*60*1000) * 7; //1 week offset
  let tripOffsetTime = selectedTime.setTime(selectedTime.getTime() - dateOffset);
  let futureForecast = tripOffsetTime > currentTime;
   console.log('futureForecast', futureForecast);
  fetchData(location, selectedTime.getTime() / 1000, futureForecast)
  return true
}

async function fetchData(location, tripDate, futureForecast) {
  const result = await fetch('http://localhost:8080/getDestination', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      location,
      date: tripDate,
      futureForecast
    }),
  })
  const {geo, weather, pic} = await result.json()
  const {webformatURL} = pic.hits[0]
  // const img = document.createElement('IMG')
  // img.setAttribute('src', webformatURL)
  const img = `<img src=${webformatURL}>`
  // console.log(geo);
  console.log(weather);
  const datepicker = document.getElementById('search-trip-date');
  const endDatepicker = document.getElementById('trip-end-date');
  let selectedTime = new Date(datepicker.value);
  let endDateTime = new Date(endDatepicker.value);
  const currentTime = new Date();
  const differenceTime = selectedTime.getTime() - currentTime.getTime();
  const tripLength = (endDateTime.getTime() - selectedTime.getTime())/ (1000 * 3600 * 24);
  //days left for departure
  const differenceDays = differenceTime/ (1000 * 3600 * 24);
  document.getElementById('displayGeo').innerHTML=`<h2>My trip to: ${geo.name}, ${geo.countryName}</h2>`;
  document.getElementById('displayTripLength').innerHTML=`<h3>Departing: ${datepicker.value}, ${geo.name} is ${Math.round(differenceDays)} days away. Trip ends: ${endDatepicker.value} and trip length is ${Math.round(tripLength)}</h3>`;
  document.getElementById('displayWeather').innerHTML=`<p>${futureForecast ? 'Forecasted' : 'Current'} weather is: ${weather.daily.data[0].summary},High ${weather.daily.data[0].temperatureHigh},Low ${weather.daily.data[0].temperatureLow}</p>`;
  document.getElementById('displayContent').innerHTML = img;
}

export {onSubmit,fetchData}
