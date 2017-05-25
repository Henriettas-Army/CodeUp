const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
// const jwt = require('jwt-simple');

const db = require('./../db/config.js');

const eventsRoute = require('./routes/eventsRoute');
const users = require('./routes/users');

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../client')));

app.listen('3034', () => {
  console.log('Listening on port 3034...');
});

// routes
app.use('/api/users', users);
// curl -H "Content-Type: application/json" -X POST -d '{"title":"xyz","date":"2014-03-04"}' http://localhost:3034/api/events
app.post('/api/events', eventsRoute.postEvent);
// curl -H "Content-Type: application/json" -X GET http://localhost:3034/api/events
app.get('/api/events', eventsRoute.getEvents);

module.exports = {
  app,
  db,
};
