const express = require('express');
// const userController = require('../../db/controllers/UserController');

const router = express.Router();

router.get('/userSearch').then((response) => {
  response.send('suck it m8!');
});

module.exports = router;
