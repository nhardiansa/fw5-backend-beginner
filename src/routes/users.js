const express = require('express');
const users = new express.Router();
const {
  uploadMiddleware
} = require('../helpers/upload');

const {
  getUser,
  addUser,
  deleteUser,
  updateUser,
  listUsers
} = require('../controllers/users');

users.get('/', listUsers);
users.get('/profile/:id', getUser);
users.get('/:id', getUser);
users.post('/', uploadMiddleware('image'), addUser);
users.patch('/:id', updateUser);
users.delete('/:id', deleteUser);

module.exports = users;
