const express = require('express');
const GITHUB_API = require('../config/github');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const UserController = require('../../db/controllers/UserController');
const Utils = require('../utils');

const router = express.Router();

const ID = GITHUB_API.CLIENT_ID;
const SECRET = GITHUB_API.CLIENT_SECRET;

router.post('/login', (req, res) => {
  const CODE = req.body.code;
  axios(`https://github.com/login/oauth/access_token?client_id=${ID}&redirect_uri=http://localhost:3034/oauth_redirect&client_secret=${SECRET}&code=${CODE}`)
  .then((response) => {
    const TOKEN = response.data.split('&')[0].split('=')[1];
    axios(`https://api.github.com/user?access_token=${TOKEN}`)
    .then((resp) => {
      const token = jwt.sign(resp.data.login, 'codeupforever');
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
    const usersData = data.filter(user => user.username !== req.query.username);
    res.status(200).json({ status: true, users: usersData });
  })
  .catch((err) => {
    res.json({ status: false, error: err });
  });
});

// get individual user profile
router.get('/:username', (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, 'codeupforever', ((err) => {
    if (err) {
      res.send(`${err.name}: Please sign in again to renew your session`);
    } else {
      Utils.grabUserInfo(req.params.username, req, res);
    }
  }));
});

// update user profile
router.put('/:username', (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, 'codeupforever', ((err, decoded) => {
    console.log('DECODED:', decoded);
    if (err) {
      res.send(`${err.name}: Please sign in again to renew your session`);
    } else {
      const body = req.body;
      const data = {};
      body.toUpdate.forEach((update) => {
        data[update.typeUpdate] = update.data;
      });
      UserController.updateUserInfo(decoded, data)
      .then(() => {
        Utils.grabUserInfo(decoded, req, res);
      })
      .catch((error) => {
        res.status(200).json({ ok: false, error });
      });
    }
  }));
});

module.exports = router;
