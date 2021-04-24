const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const activity = '';

  router.post('/newActivity', (req, res, next) => {
    db.query(
      'INSERT INTO activity (activity_name, max_temperature, min_temperature) VALUES (?,?,?)',
      [req.body.activity_name, req.body.max_temperature, req.body.min_temperature],
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

  return router;
}

module.exports = createRouter;