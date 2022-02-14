const express = require('express');
const {
  loginUser,
  registerUser,
  sentConfirmationCode,
  emailVerifcation,
  resetPassword
} = require('../controllers/users');
const auth = new express.Router();

auth.post('/login', loginUser);
auth.post('/register', registerUser);
auth.post('/sentConfirmation', sentConfirmationCode);
auth.post('/emailVerification', emailVerifcation);

auth.patch('/resetPassword', resetPassword);

module.exports = auth;
