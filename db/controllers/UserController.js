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
  });
  newUser.save()
  .then((data) => {
    console.info('saved: ', data);
  })
  .catch((err) => {
    console.error('error saving new user to DB: ', err.message);
  });
};

module.exports = {
  postUser,
};
