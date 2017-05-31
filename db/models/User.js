const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const endorsementSchema = new Schema({
  endorser_username: String,
  endorser_img: String,
  skills: [String],
  comment: String
});

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
    type: [Schema.Types.Mixed],
  },
  endorsements: {
    type: [endorsementSchema]
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
