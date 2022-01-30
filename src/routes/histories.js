const express = require('express');
const histories = new express.Router();

const {
  getHistories,
} = require('../controllers/histories');

histories.get('/', getHistories);

module.exports = histories;
