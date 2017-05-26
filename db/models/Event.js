const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: 'user', //IN PRODUCTION TIME (OR BEFORE) THIS SHOULD BE REQUIRED: TRUE
  },
  topics: [String],
  date: { type: Date, required: true },
  location: [String],
  duration: Number,
  description: String,
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
