const express = require('express');
const GITHUB_API = require('../config/github');
const axios = require('axios');
const jwt = require('jwt-simple');
const UserController = require('../../db/controllers/UserController');
const Utils = require('../utils');

const router = express.Router();

const ID = GITHUB_API.CLIENT_ID;
const SECRET = GITHUB_API.CLIENT_SECRET;

router.post('/login', (req, res) => {
  const CODE = req.body.code;
  console.log('CODE==================>', CODE);
  axios(`https://github.com/login/oauth/access_token?client_id=${ID}&redirect_uri=http://localhost:3034/oauth_redirect&client_secret=${SECRET}&code=${CODE}`)
  .then((response) => {
    const TOKEN = response.data.split('&')[0].split('=')[1];
    console.log('ACCESS TOKEN================>', TOKEN);
    axios(`https://api.github.com/user?access_token=${TOKEN}`)
    .then((resp) => {
      const token = jwt.encode(resp.data.login, 'secret');
      res.json(token);
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
        Utils.grabUserReposandSave(user.username, user.access_token);
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

router.get('/list', (req, res) => {
  UserController.getAllUsers()
  .then((data) => {
    res.status(200).json({ status: 'good', users: data });
  })
  .catch((err) => {
    res.json({ status: 'error', error: err });
  });
});

// get individual user profile
router.get('/:username', (req, res) => {
  Utils.grabUserInfo(req.params.username, req, res);
});

// update user profile
router.put('/:username', (req, res) => {
  const body = req.body;
  const data = {};
  body.toUpdate.forEach((update) => {
    data[update.typeUpdate] = update.data;
  });
  UserController.updateUserInfo(req.params.username, data)
  .then(() => {
    Utils.grabUserInfo(req.params.username, req, res);
  })
  .catch((err) => {
    res.status(200).json({ ok: false, err });
  });
});

module.exports = router;
