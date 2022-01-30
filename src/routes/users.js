const express = require('express');
const users = new express.Router();

const {
  getUser,
} = require('../controllers/users');

users.get('/:id', getUser);

module.exports = users;
