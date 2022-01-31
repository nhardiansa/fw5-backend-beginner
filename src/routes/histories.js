const express = require('express');
const histories = new express.Router();

const {
  getHistories,
  addHistory
} = require('../controllers/histories');

histories.get('/', getHistories);
histories.post('/', addHistory);

module.exports = histories;
