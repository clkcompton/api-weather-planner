const fetch = require('node-fetch');


//iterates through each weekday's forecast and compares the forecast to the user's preferences. Returns boolean for whether or not the forecast meets the user's preferences
function getActivityForecast(activity, weekForecast) {

  let comparisons = {};

  for (let i = 0; i < weekForecast.length; i++) {
    comparisons[weekForecast[i].dayOfWeek] = compareUserAndWeatherData(activity, weekForecast[i])
  }

  return comparisons;
}



//makes the comparisons between the weeday's forecast and the user's preferences
function compareUserAndWeatherData(activity, dayForecast) {

  let isMaxTempInBounds;
  let isMinTempInBounds;
  let doesDescriptionMatch;
  let isInBounds;

  let comparisonResultsObj;

  if (dayForecast.maxTemp <= activity.max_temperature) {
    isMaxTempInBounds = true;
  } else {
    isMaxTempInBounds = false;
  }

  if (dayForecast.minTemp >= activity.min_temperature) {
    isMinTempInBounds = true;
  } else {
    isMinTempInBounds = false;
  }

  if (activity.weather_description === dayForecast.weatherDescription) {
    doesDescriptionMatch = true;
  } else {
    doesDescriptionMatch = false;
  }

  if (isMaxTempInBounds && isMinTempInBounds && doesDescriptionMatch) {
    isInBounds = true;
  } else {
    isInBounds = false;
  }

  comparisonResultsObj = {
      isMaxTempInBounds, 
      isMinTempInBounds,
      doesDescriptionMatch,
      isInBounds
    }

  return comparisonResultsObj;

}

module.exports = compareUserAndWeatherData;
module.exports = getActivityForecast;