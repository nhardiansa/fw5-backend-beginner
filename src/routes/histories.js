const express = require('express');
const histories = new express.Router();

const auth = require('../middlewares/auth');

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

histories.post('/', auth.verifyUser, addHistory);

histories.patch('/:id', auth.verifyAdmin, upadateHistory);

histories.delete('/:id', auth.verifyUser, deleteHistory);

module.exports = histories;
