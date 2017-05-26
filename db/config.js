const mongoose = require('mongoose');

mongoose.Promise = Promise;

// mongoose.connect('mongodb://db:27017');

mongoose.connect('mongodb:localhost/codeupdb');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongodb connection open');
});
