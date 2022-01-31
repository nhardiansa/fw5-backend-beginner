const express = require('express');
const users = new express.Router();

const {
  getUser,
  addUser,
  deleteUser,
  updateUser
} = require('../controllers/users');

users.get('/:id', getUser);
users.delete('/:id', deleteUser);
users.put('/:id', updateUser);
users.post('/', addUser);

module.exports = users;
