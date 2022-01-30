const db = require('../helpers/db');
const historiesTable = 'histories';

module.exports = {
  getHistories: (keys, cb) => {
    db.query(`SELECT ?? FROM ${historiesTable}`, [keys], (err, results) => {
      cb(results);
    });
  },
};
