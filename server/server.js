const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const db = require('./../db/config.js');
const eventsRoute = require('./routes/eventsRoute');
const users = require('./routes/users');

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../client')));

/* eslint-disable no-console */
app.listen('3034', () => {
  console.log('Listening on port 3034...');
});
/* eslint-enable no-console. */

// routes
app.use('/api/users', users);
app.post('/api/events', eventsRoute.postEvent);
app.get('/api/events', eventsRoute.getEvents);
app.post('/api/events/delete', eventsRoute.deleteEvent);

// Send the rest of the requests to React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = {
  app,
  db,
};
