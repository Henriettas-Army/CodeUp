const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const db = require('./../db/config.js');
const eventsRoute = require('./routes/eventsRoute');
const users = require('./routes/users');
const endorsement = require('./routes/endorsement');

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../client')));

/* eslint-disable no-console */
const server = app.listen('3034', () => {
  console.log('Listening on port 3034...');
});

const io = require('socket.io')(server);
require('./routes/chat')(io);

/* eslint-enable no-console. */

// routes
app.use('/api/users', users);
app.use('/api/events', eventsRoute);
app.post('/api/endorsement', endorsement);

// Send the rest of the requests to React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = {
  app,
  db,
};
