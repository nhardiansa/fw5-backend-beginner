const express = require('express');
const users = new express.Router();
const {
  uploadMiddleware
} = require('../middlewares/upload');

const {
  getUser,
  addUser,
  deleteUser,
  updateUser,
  listUsers,
  getProfile
} = require('../controllers/users');

const auth = require('../middlewares/auth');

users.get('/', auth.verifyAdmin, listUsers);
users.get('/profile/:id', getUser);
users.get('/profile', auth.verifyUser, getProfile);
users.get('/:id', auth.verifyUser, getUser);

users.post('/', auth.verifyAdmin, uploadMiddleware('image'), addUser);

users.patch('/:id', auth.verifyUser, uploadMiddleware('image'), updateUser);

users.delete('/:id', auth.verifyAdmin, deleteUser);

module.exports = users;
