const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const user = require('./user');
// const weather = require('./weather')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'weather',
  password : 'password',
  database : 'weather-planner'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(user(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});