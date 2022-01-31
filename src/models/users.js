const db = require('../helpers/db');
const table = require('../helpers/constant').usersTable;

exports.getUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM ${table} WHERE id = ?`, [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

exports.insertUser = (data) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${table} SET ?`;

    db.query(query, data, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM ${table} WHERE id = ? `, [id], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.findEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) AS 'rows' FROM ${table} WHERE email = ?`, [email], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.findPhone = (phone) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) AS 'rows' FROM ${table} WHERE phone = ?`, [phone], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
