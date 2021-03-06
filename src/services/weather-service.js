require('dotenv').config();

const fetch = require('node-fetch');

//calls open weather api, gets forecast for the upcoming week, and formats result
async function getForecast() {

  const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=38.62&lon=-90.19&exclude=hourly,minutely,current,alerts&units=imperial&appid=${process.env.WEATHER_API_KEY}`);
  const body = await response.json();

  const result = body.daily.map(day => {
    return {
      dayOfWeek: new Date((day.dt)*1000).toLocaleDateString('en-US', {weekday: 'long'}),
      maxTemp: day.temp.max,
      minTemp: day.temp.min,
      weatherDescription: day.weather[0].main,
      imageCode: day.weather[0].id
    }});

  result.pop();
  return result;
}

module.exports = getForecast;