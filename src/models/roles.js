const db = require('../helpers/db');
const table = require('../helpers/constant').rolesTable;

exports.getRole = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${table} WHERE id = ?`;

    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
