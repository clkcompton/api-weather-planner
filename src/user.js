const getForecast = require('./services/weather-service');


const express = require('express');

function createRouter(db) {
  const router = express.Router();
  // const username = '';

  router.get('/weather', async function (req, res, next) {
    const forecast = await getForecast();
    console.log(forecast);

        res.status(200).json(forecast);
  });

  router.post('/user', (req, res, next) => {
    db.query(
      'INSERT INTO user (username, password) VALUES (?,?)',
      [req.body.username, req.body.password],
      (error) => {
        console.log(req.body)
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/user', function (req, res, next) {
    db.query(
      'SELECT id, password FROM user WHERE username=?',
      [req.body.username],
      (error, results) => {
        console.log(req.body);
        console.log(results);
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

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

  router.delete('/user/:id', function (req, res, next) {
    db.query(
      'DELETE FROM user WHERE id=?',
      [req.params.id],
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