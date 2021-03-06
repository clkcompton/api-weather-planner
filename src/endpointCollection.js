const getForecast = require('./services/weather-service');
const compareUserAndWeatherData = require('./activity');
const getActivityForecast = require('./activity');


const express = require('express');

function createRouter(db) {
  const router = express.Router();


  //calls getForecast() in weather-service.js
  router.get('/weather', async function (req, res, next) {
    const forecast = await getForecast();

    res.status(200).json(forecast);
  });


  //gets each day's weather comparisons
  router.get('/get-activities-by-user-id/:id', async function (req, res, next) {
    const weekForecast = await getForecast();

      db.query(
          'SELECT id_activity, activity_name, max_temperature, min_temperature, weather_description FROM activity WHERE user_id=?',
          [req.params.id],
          (error, results) => {
            if (error) {
              console.log(error);
            }
      
            const activityForecastCollection = results.map(activity => {
              return {
                ...activity,
                activityForecast: getActivityForecast(activity, weekForecast)

                // activityForecast: weekForecast.map( dayForecast => {
                //   return compareUserAndWeatherData(activity, dayForecast)
                //  })
              }
            })
      
            res.status(200).json(activityForecastCollection);
          }
        );
  });

  
  //add new activity
  router.post('/addActivity', (req, res, next) => {
    db.query(
      'INSERT INTO activity (activity_name, max_temperature, min_temperature, weather_description, user_id) VALUES (?,?,?,?,?)',
      [req.body.activity_name, req.body.max_temperature, req.body.min_temperature, req.body.weather_description, req.body.user_id],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


  //delete activity
  router.delete('/delete_activity/:id_activity', function (req, res, next) {
    db.query(
      'DELETE FROM activity WHERE id_activity=?',
      [req.params.id_activity],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


  //edit activity
  router.put('/update-activity/:id_activity', function (req, res, next) {
    db.query(
      'UPDATE activity SET max_temperature=?, min_temperature=?, weather_description=? WHERE id_activity=?',
      [req.body.max_temperature, req.body.min_temperature, req.body.weather_description, req.params.id_activity],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  
  //register user
  router.post('/user', (req, res, next) => {
    db.query(
      'INSERT INTO user (username, password) VALUES (?,?)',
      [req.body.username, req.body.password],
      (error) => {
        // console.log(req.body)
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


  //for user login
  router.get('/login-user/:username', function (req, res, next) {
    db.query(
      'SELECT id, password FROM user WHERE username=?',
      [req.params.username],
      (error, results) => {
        // console.log(req.params);
        // console.log(results);
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results[0]);
        }
      }
    );
  });


  //used to get id and password from current user
  router.get('/check-for-user/:username', function (req, res, next) {
    db.query(
      'SELECT id, password FROM user WHERE username=?',
      [req.params.username],
      (error, results) => {
        // console.log(req.params);
        // console.log(results);
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results[0]);
        }
      }
    );
  });


  //update password
  router.put('/update-password-by-username/:username', function (req, res, next) {
    db.query(
      'UPDATE user SET password=? WHERE username=?',
      [req.body.password, req.params.username],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


  //delete user; not currently in use
  router.delete('/user/:username', function (req, res, next) {
    db.query(
      'DELETE FROM user WHERE username=?',
      [req.params.username],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


  //update password by id; not currently in use
  router.put('/user/:id', function (req, res, next) {
    db.query(
      'UPDATE user SET password=? WHERE id=?',
      [req.body.password, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;