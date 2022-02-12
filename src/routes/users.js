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
  loginUser,
  forgotPassword,
  resetPassword
} = require('../controllers/users');

const auth = require('../middlewares/auth');

users.get('/', auth.verifyAdmin, listUsers);
users.get('/profile/:id', getUser);
users.get('/:id', getUser);

users.post('/', auth.verifyAdmin, uploadMiddleware('image'), addUser);
users.post('/register', registerUser);
users.post('/auth/login', loginUser);
users.post('/forgotPassword', forgotPassword);
users.post('/resetPassword', resetPassword);

users.patch('/:id', auth.verifyUser, uploadMiddleware('image'), updateUser);

users.delete('/:id', auth.verifyAdmin, deleteUser);

module.exports = users;
