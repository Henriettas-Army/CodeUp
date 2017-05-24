const User = require('./../models/User');
// save user to database
const postUser = (userObj) => {
  const newUser = new User({
    username: userObj.username,
    name: userObj.name,
    img: userObj.img,
    bio: userObj.bio,
    location: userObj.location,
    repos: userObj.repos,
    desired: [],
    skills: [],
    access_token: userObj.access_token,
  });
  newUser.save()
  .then((data) => {
    console.info('saved: ', data);
  })
  .catch((err) => {
    console.error('error saving new user to DB: ', err.message);
  });
};

const getUserInfo = username => (
  User.findOne({ username })
);

const postRepos = (username, fourRepos) => {
  User.findOneAndUpdate({ username }, { repos: fourRepos })
  .then((user) => {
    console.log('successful update of user: ', user);
  })
  .catch((err) => {
    console.error('error updating user repos', err);
  });
};

module.exports = {
  postUser,
  getUserInfo,
  postRepos,
};
