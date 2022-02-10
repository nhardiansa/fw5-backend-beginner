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
  listUsers,
  registerUser,
  loginUser
} = require('../controllers/users');

const auth = require('../middlewares/auth');

users.get('/', auth.verifyAdmin, listUsers);
users.get('/profile/:id', getUser);
users.get('/:id', getUser);

users.post('/', auth.verifyAdmin, uploadMiddleware('image'), addUser);
users.post('/register', registerUser);
users.post('/auth/login', loginUser);

users.patch('/:id', auth.verifyUser, uploadMiddleware('image'), updateUser);

users.delete('/:id', auth.verifyAdmin, deleteUser);

module.exports = users;
