const express = require('express');
const histories = new express.Router();

const {
  getHistories,
  addHistory,
  deleteHistory,
  upadateHistory
} = require('../controllers/histories');

histories.get('/', getHistories);
histories.post('/', addHistory);
histories.delete('/:id', deleteHistory);
histories.patch('/:id', upadateHistory);

module.exports = histories;
