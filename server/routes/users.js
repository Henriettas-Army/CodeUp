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


module.exports = router;
