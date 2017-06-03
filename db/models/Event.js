const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // username: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'user', //IN PRODUCTION TIME (OR BEFORE) THIS SHOULD BE REQUIRED: TRUE
  // },
  username: String,
  topics: [String],
  date: { type: Date, required: true },
  location: [String],
  duration: String,
  description: String,
  pinned: [String],
  private: Boolean,
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
