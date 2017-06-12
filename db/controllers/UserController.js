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

// retrieve user info from db
const getUserInfo = username => (
  User.findOne({ username })
);

// posts top four repo information and language data info in db
const postRepos = (username, fourRepos, languageData) => (
  // console.log('IN POST REPOS:', fourRepos, languageData);
  User.findOneAndUpdate({ username }, { repos: fourRepos, meter: languageData })
  // .then((resp) => {
  //   console.log(resp);
  //   getUserInfo(username)
  //   .then((user) => {
  //     console.log(user);
  //   });
  // });
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
