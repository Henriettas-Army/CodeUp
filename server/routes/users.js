const express = require('express');
const jwt = require('jsonwebtoken');
const UserController = require('../../db/controllers/UserController');
const Utils = require('../utils');

const positionHelper = require('../utils/positionHelper');

const router = express.Router();

router.post('/login', (req, res) => {
  const CODE = req.body.code;
  Utils.getAccessToken(CODE)
  .then((response) => {
    const TOKEN = response.data.split('&')[0].split('=')[1];
    Utils.gitHubUserInformation(TOKEN)
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
});

// get individual user profile
router.get('/:username', (req, res) => {
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
});

router.post('/position', (req, res) => {
  positionHelper.set(req.body.username, [req.body.lat, req.body.lng]);
  res.send('ok');
});

// update user profile
router.put('/:username', (req, res) => {
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
});

module.exports = router;
