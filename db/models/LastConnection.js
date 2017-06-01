const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lastConnectionSchema = new Schema({
  date: {
    type: Number,
    required: true,
    unique: true,
  },
  room: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const LastConnection = mongoose.model('lastConnection', lastConnectionSchema);
lastConnectionSchema.index({ username: 1, room: 1 }, { unique: true });

module.exports = LastConnection;
