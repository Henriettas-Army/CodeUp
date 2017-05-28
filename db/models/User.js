const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  bio: {
    type: String,
  },
  skills: {
    type: [String],
  },
  desired: {
    type: [String],
  },
  location: {
    type: [String],
  },
  status: {
    type: String,
  },
  repos: {
    type: [String],
  },
  languages: {
    type: String,
  },
  access_token: {
    type: String,
  },
  meter: {
    type: [String],
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
