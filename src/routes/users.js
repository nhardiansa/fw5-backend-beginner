const express = require('express');
const users = new express.Router();

const {
  getUser,
  addUser
} = require('../controllers/users');

users.get('/:id', getUser);
users.post('/', addUser);

module.exports = users;
