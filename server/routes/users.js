<<<<<<< HEAD
// users route
const express = require('express');
const userController = require('../../db/controllers/UserController');

const router = express.Router();

// get individual user profile
router.get('/:username', (req, res) => {
  userController.getUserInfo('cdcjj')
  .then((resp) => {
    res.status(200).json(resp);
  })
  .catch((err) => {
    res.json(err);
  });
});

=======
const express = require('express');
const GITHUB_API = require('../config/github');
const axios = require('axios');

const router = express.Router();

const ID = GITHUB_API.CLIENT_ID;
const SECRET = GITHUB_API.CLIENT_SECRET;

router.get('/login', (req, res) => {
  const CODE = req.query.code;
  console.log('CODE:', CODE);
  axios(`https://github.com/login/oauth/access_token?client_id=${ID}&redirect_uri=http://localhost:3034/api/users/login/oauth_redirect&client_secret=${SECRET}&code=${CODE}`)
  .then((response) => {
    console.log('TOKEN:', response.data.split('&')[0].split('=')[1]);
    const TOKEN = response.data.split('&')[0].split('=')[1];
    axios(`https://api.github.com/user?access_token=${TOKEN}`)
    .then((resp) => {
      console.log(resp);
    });
  });
});
>>>>>>> storing code received from github

module.exports = router;
