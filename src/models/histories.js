const db = require('../helpers/db');
const table = require('../helpers/constant').historiesTable;

exports.getHistories = (keys, page, limit) => {
  return new Promise((resolve, reject) => {
    const ss = db.query(`
      SELECT ?? FROM ${table}
      LIMIT ? OFFSET ?
    `, [keys, limit, page], (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
    console.log(ss.sql);
  });
};

exports.addHistory = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
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
    db.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, results) => {
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
    db.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.updateHistory = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.countHistories = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) AS total FROM ${table}`, (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
