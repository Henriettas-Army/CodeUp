const express = require('express');
const userController = require('../../db/controllers/UserController');

const router = express.Router();

router.get('/userlist', (req, res) => {
  userController.getAllUsers()
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    res.json(err);
  });
});

module.exports = router;
