const mongoose = require('mongoose');

mongoose.Promise = Promise;
//Trigger Docker build
mongoose.connect('mongodb://mongo:27017/codeupdb');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongodb connection open');
});
