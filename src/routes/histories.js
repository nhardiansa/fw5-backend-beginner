const express = require('express');
const histories = new express.Router();

const auth = require('../middlewares/auth');

const {
  addHistory,
  deleteHistory,
  upadateHistory,
  getHistory,
  getFilteredHistories,
  deleteHistoryPermanent
} = require('../controllers/histories');

histories.get('/', auth.verifyAdmin, getFilteredHistories);
histories.get('/filter/:userId', auth.verifyUser, getFilteredHistories);
histories.get('/:id', getHistory);

histories.post('/', auth.verifyUser, addHistory);

histories.patch('/:id', auth.verifyAdmin, upadateHistory);

histories.delete('/:id', auth.verifyUser, deleteHistory);
histories.delete('/:id/admin', auth.verifyAdmin, deleteHistoryPermanent);

module.exports = histories;
