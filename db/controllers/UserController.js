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
    status: 'Available',
    desired: [],
    skills: [],
    access_token: userObj.access_token,
  });
  const data = { name: userObj.name,
    img: userObj.img,
    bio: userObj.bio,
    location: userObj.location,
    status: 'Available',
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

const postRepos = (username, fourRepos) => (
  User.findOneAndUpdate({ username }, { repos: fourRepos })
);

const updateUserInfo = (username, data) => (
  User.findOneAndUpdate({ username }, data)
);

const getAllUsers = () => User.find({});

module.exports = {
  postUser,
  getUserInfo,
  postRepos,
  updateUserInfo,
  getAllUsers,
};
