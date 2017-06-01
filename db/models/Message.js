const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
    unique: true,
  },
  room: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
