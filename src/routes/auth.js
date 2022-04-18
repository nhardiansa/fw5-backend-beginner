const express = require('express');

const {
  loginUser,
  registerUser,
  confirmReset
} = require('../controllers/auth');

const auth = new express.Router();

auth.post('/login', loginUser);
auth.post('/register', registerUser);
auth.post('/confirm-reset', confirmReset);
// auth.post('/emailVerification', emailVerifcation);

// auth.patch('/resetPassword', resetPassword);

module.exports = auth;
