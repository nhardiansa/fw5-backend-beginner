const db = require('../helpers/db');
const usersTable = 'users';

exports.getUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM ${usersTable} WHERE id = ?`, [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

exports.insertUser = (data) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${usersTable} SET ?`;

    db.query(query, data, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
