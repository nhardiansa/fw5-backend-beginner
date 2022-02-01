const express = require('express');
const histories = new express.Router();

const {
  getHistories,
  addHistory,
  deleteHistory
} = require('../controllers/histories');

histories.get('/', getHistories);
histories.post('/', addHistory);
histories.delete('/:id', deleteHistory);

module.exports = histories;
