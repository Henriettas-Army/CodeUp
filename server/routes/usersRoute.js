const GITHUB_API = require('../config/github');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const UserController = require('../../db/controllers/UserController');
const Utils = require('../utils');
const positionHelper = require('../utils/positionHelper');

const ID = GITHUB_API.CLIENT_ID;
const SECRET = GITHUB_API.CLIENT_SECRET;


module.exports = {
  postLogin: (req, res) => {
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
  },
  getUsersList: (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, 'codeupforever', ((err) => {
      if (err) {
        res.send(`${err.name}: Please sign in again to renew your session`);
      } else {
        UserController.getAllUsers()
        .then((data) => {
          const usersData = data
          // filter(user => user.username !== decoded)
          .map((user) => {
            const user2 = user;
            user2.position = positionHelper.get(user.username) || null;
            return user2;
          });
          res.status(200).json({
            status: true,
            users: usersData.map(user => Object.assign({ position: user.position }, user._doc))
          });
        })
        .catch((error) => {
          res.json({ status: false, error });
        });
      }
    }));
  },
  // post user postion
  postPosition: (req, res) => {
    positionHelper.set(req.body.username, [req.body.lat, req.body.lng]);
    res.send('ok');
  },
  // get individual user profile
  getProfile: (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, 'codeupforever', ((err) => {
      if (err) {
        res.send(`${err.name}: Please sign in again to renew your session`);
      } else {
        Utils.grabUserInfo(req.params.username, req, res)
        .then((userPro) => {
          res.status(200).json({ ok: true, user: userPro });
        })
        .catch((error) => {
          res.json({ ok: false, error });
        });
      }
    }));
  },

  // update user profile
  updateProfile: (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, 'codeupforever', ((err, decoded) => {
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
          Utils.grabUserInfo(decoded, req, res)
          .then((userPro) => {
            res.status(200).json({ ok: true, user: userPro });
          })
          .catch((error2) => {
            res.json({ ok: false, error2 });
          });
        })
        .catch((error) => {
          res.status(200).json({ ok: false, error });
        });
      }
    }));
  },
};
