const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './../client')));

app.listen('3034', () => {
  console.log('Listening on port 3034...');
});
