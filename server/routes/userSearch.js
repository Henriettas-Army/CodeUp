const express = require('express');
const userController = require('../../db/controllers/UserController');

const router = express.Router();

router.get('/userSearch').then((res) => {
  userController.getAllUsers()
  .then((resp) => {
    res.status(200).json(resp);
  })
  .catch((err) => {
    res.json(err);
  });
});

module.exports = router;
