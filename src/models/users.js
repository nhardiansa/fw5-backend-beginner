const db = require('../helpers/db');
const usersTable = 'users';

module.exports = {
  getUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`
      SELECT * FROM ${usersTable} WHERE id = ?`, [id], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },
};
