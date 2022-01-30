const db = require('../helpers/db');
const usersTable = 'users';

module.exports = {
  getUser: (id, cb) => {
    db.query(`
    SELECT * FROM ${usersTable} WHERE id = ?
    `, [id], (err, results) => {
      cb(results);
    });
  },
};
