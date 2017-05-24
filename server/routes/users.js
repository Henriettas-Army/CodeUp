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
});
>>>>>>> storing code received from github

module.exports = router;
