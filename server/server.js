const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const jwt = require('jsonwebtoken');
const utils = require('./utils.js');
const db = require('./../db/config.js');
// const users = require('./routes/users.js');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../client')));

app.listen('3034', () => {
  console.log('Listening on port 3034...');
});

utils.gitUserRepos('cdcjj')
  .then((repos) => {
    console.log(repos);
  });

module.exports = {
  app,
  db,
};
