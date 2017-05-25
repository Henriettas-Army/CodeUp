const express = require('express');
const GITHUB_API = require('../config/github');
const axios = require('axios');
const jwt = require('jwt-simple');
const UserController = require('../../db/controllers/UserController');

const router = express.Router();

const ID = GITHUB_API.CLIENT_ID;
const SECRET = GITHUB_API.CLIENT_SECRET;

router.post('/login', (req, res) => {
  const CODE = req.body.code;
  axios(`https://github.com/login/oauth/access_token?client_id=${ID}&redirect_uri=http://localhost:3034/api/users/login/oauth_redirect&client_secret=${SECRET}&code=${CODE}`)
  .then((response) => {
    const TOKEN = response.data.split('&')[0].split('=')[1];
    axios(`https://api.github.com/user?access_token=${TOKEN}`)
    .then((resp) => {
      const newUser = {
        username: resp.data.login,
        name: resp.data.name === null ? '' : resp.data.name,
        img: resp.data.avatar_url,
        bio: resp.data.bio === null ? '' : resp.data.bio,
        location: resp.data.location === null ? '' : resp.data.location,
        repos: [],
        desired: [],
        skills: [],
        access_token: TOKEN,
      };
      UserController.postUser(newUser)
      .then((user) => {
        console.log('EUREKA!!!!!!!!', user.username);
        const token = jwt.encode(user.username, 'secret');
        res.json(token);
      })
      .catch((err) => {
        console.log('ERROR LOGGING IN:', err);
      });
    })
    .catch((err) => {
      console.log('ERROR GETTING ACCESS TOKEN:', err);
    });
  })
  .catch((err) => {
    console.log('ERROR GETTING TOKEN:', err);
  });
});

module.exports = router;
