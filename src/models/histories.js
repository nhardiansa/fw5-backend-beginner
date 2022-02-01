const db = require('../helpers/db');
const {
  historiesTable
} = require('../helpers/constant');

exports.getHistories = (keys, cb) => {
  db.query(`SELECT ?? FROM ${historiesTable}`, [keys], (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.addHistory = (data) => {
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
};

exports.deleteHistory = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM ${historiesTable} WHERE id = ?`, [id], (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getHistory = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${historiesTable} WHERE id = ?`, [id], (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
