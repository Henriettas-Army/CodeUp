const mongoose = require('mongoose');
const promise = require('bluebird');

mongoose.Promise = promise;

mongoose.connect("mongodb://db:27017");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongodb connection open');
});
