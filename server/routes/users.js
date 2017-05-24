const express = require('express');
const GITHUB_API = require('../config/github');
const axios = require('axios');
const UserController = require('../../db/controllers/UserController');

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
      console.log('USER RESPONSE:', resp);
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
      console.log('NEW USER IN SERVER ROUTE:', newUser);
      UserController.postUser(newUser)
      .then((username) => {
        console.log(username);
      });
    });
  });
});

module.exports = router;
