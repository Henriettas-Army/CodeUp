const mongoose = require('mongoose');
const promise = require('bluebird');

mongoose.Promise = promise;
global.Promise = mongoose.Promise;
mongoose.connect('mongodb://localhost/codeupdb');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongodb connection open');
});
