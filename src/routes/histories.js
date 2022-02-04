const express = require('express');
const histories = new express.Router();

const {
  addHistory,
  deleteHistory,
  upadateHistory,
  listHistories,
  getHistory,
  getFilteredHistories
} = require('../controllers/histories');

histories.get('/', listHistories);
histories.get('/filter', getFilteredHistories);
histories.get('/:id', getHistory);
histories.post('/', addHistory);
histories.patch('/:id', upadateHistory);
histories.delete('/:id', deleteHistory);

module.exports = histories;
