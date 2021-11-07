'use strict';

const express = require('express');
const { sign_up, sign_in } = require('../auth/auth');

const usersRouter = express.Router();

// request routes and callbacks
usersRouter.post('/sign-up', sign_up);
usersRouter.post('/sign-in', sign_in);

// require this to server.js
module.exports = usersRouter;