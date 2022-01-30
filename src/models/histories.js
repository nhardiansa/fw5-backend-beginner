const db = require('../helpers/db');
const {
  historiesTable,
} = require('../helpers/constant');

module.exports = {
  getHistories: (keys, cb) => {
    db.query(`SELECT ?? FROM ${historiesTable}`, [keys], (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },

  addHistory: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${historiesTable} SET ?`, data, (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
