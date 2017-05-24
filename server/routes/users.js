// users route

const server = require('./../server.js');

const app = server.app;
const express = require('express');
const router = express.Router();
const userController = require('../../db/controllers/UserController');

// router.get('/:username')
