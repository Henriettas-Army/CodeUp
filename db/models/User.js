const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const endorsementSchema = new Schema({
  endorser_username: String,
  endorser_img: String,
  skills: [String],
  comment: [String]
});

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  img: String,
  bio: String,
  skills: [String],
  desired: [String],
  location: [String],
  status: String,
  languages: String,
  access_token: String,
  meter: [Schema.Types.Mixed],
  endorsements: [endorsementSchema]
});

const User = mongoose.model('user', userSchema);

module.exports = User;
