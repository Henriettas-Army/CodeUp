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

// get individual user profile
router.get('/:username', (req, res) => {
  UserController.getUserInfo(req.params.username)
  .then((resp) => {
    if (!resp) {
      res.status(200).json({ ok: false, user: null });
      return;
    }
    const profile = Object.assign({}, { resp });
    profile.resp.access_token = '';
    res.status(200).json({ ok: true, user: profile.resp });
  })
  .catch((err) => {
    res.status(200).json({ ok: false, err });
  });
});

// update user profile
router.put('/:username', (req, res) => {
  let data;
  switch (req.updateUserInfo) {
    case 'skills':
      data = { skills: req.data };
      break;
    case 'desired':
      data = { desired: req.data };
      break;
    case 'status':
      data = { status: req.data };
      break;
    default:
      data = {};
      break;
  }
  UserController.updateUserInfo(req.params.username, data)
  .then((resp) => {
    res.status(200).json({ ok: true, user: resp });
  })
  .catch((err) => {
    res.status(200).json({ ok: false, err });
  });
});

module.exports = router;
