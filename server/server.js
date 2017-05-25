const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./../db/config.js');
const users = require('./routes/users.js');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../client')));

app.listen('3034', () => {
  console.log('Listening on port 3034...');
});

// routes
app.use('/api/users', users);

module.exports = {
  app,
  db,
};
