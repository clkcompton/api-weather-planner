const fetch = require('node-fetch');

// async function getActivitiesByUserId(db, req, weekForecast) {
//   await db.query(
//     'SELECT activity_name, max_temperature, min_temperature, weather_description FROM activity WHERE user_id=?',
//     [req.params.id],
//     (error, results) => {
//       if (error) {
//         console.log(error);
//         // throw 'Parameter is not a number!';
//       }

//       const activityForecastCollection = results.map(activity => {
//         return {
//           ...activity,
//           activityForecast: weekForecast.map( dayForecast => {
//             return compareUserAndWeatherData(activity, dayForecast)
//            })
//         }
//       })

//       return activityForecastCollection;
//     }
//   );
// }

function getActivityForecast(activity, weekForecast) {

  let comparisons = {};

  for (let i = 0; i < weekForecast.length; i++) {
    comparisons[weekForecast[i].dayOfWeek] = compareUserAndWeatherData(activity, weekForecast[i])
  }
  console.log("comparisons: ", comparisons);
  return comparisons;
}




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