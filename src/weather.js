const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const weather = '';

  router.get('/weather', function (req, res, next) {
    console.log("Weather GET is working");
    // db.query(
    //   'SELECT id, password FROM user WHERE username=?',
    //   [req.body.username],
    //   (error, results) => {
    //     console.log(req.body);
    //     console.log(results);
    //     if (error) {
    //       console.log(error);
    //       res.status(500).json({status: 'error'});
    //     } else {
          res.status(200).json(results);
    //     }
    //   }
    // );
  });

return router;
}

module.exports = createRouter;