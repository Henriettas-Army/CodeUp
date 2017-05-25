const User = require('./../models/User');
// save user to database
const postUser = (userObj) => {
  console.log('USER OBJ:', userObj);
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
  const data = { name: userObj.name,
    img: userObj.img,
    bio: userObj.bio,
    location: userObj.location,
    access_token: userObj.access_token
  };
  return User.findOne({ username: userObj.username })
  .then((user) => {
    if (user) {
      return User.findOneAndUpdate({ username: userObj.username }, data);
    }
    return newUser.save();
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

const getAllUsers = () => User.find({});

module.exports = {
  postUser,
  getUserInfo,
  postRepos,
  updateUserInfo,
  getAllUsers,
};
