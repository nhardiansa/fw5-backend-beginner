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
  sentConfirmationCode,
  resetPassword,
  emailVerifcation
} = require('../controllers/users');

const auth = require('../middlewares/auth');

users.get('/', auth.verifyAdmin, listUsers);
users.get('/profile/:id', getUser);
users.get('/:id', auth.verifyUser, getUser);

users.post('/', auth.verifyAdmin, uploadMiddleware('image'), addUser);
users.post('/register', registerUser);
users.post('/auth/login', loginUser);
users.post('/forgotPassword', sentConfirmationCode);
users.post('/resetPassword', resetPassword);
users.post('/emailVerifcation', emailVerifcation);

users.patch('/:id', auth.verifyUser, uploadMiddleware('image'), updateUser);

users.delete('/:id', auth.verifyAdmin, deleteUser);

module.exports = users;
