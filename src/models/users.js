const db = require('../helpers/db');
const {
  rolesTable
} = require('../helpers/constant');
const table = require('../helpers/constant').usersTable;
const {
  whereLikeCreator
} = require('../helpers/queryCreator');

exports.getUser = (id, noData = false) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
    ${noData ? "COUNT(*) AS 'rows'" : 'u.id, u.name, u.email, u.confirmed, u.phone, u.gender, u.birthdate, u.address, r.name as role,u.image, u.created_at, u.updated_at'} 
    FROM ${table} u
    LEFT JOIN ${rolesTable} r
    ON u.role_id = r.id
    WHERE u.id = ?`;

    db.query(query, [id], (err, results) => {
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

exports.findUserByData = (data, withData = false) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT ${withData ? 'u.*, r.name as role' : "COUNT(*) AS 'rows'"} 
      FROM ${table} u
      LEFT JOIN ${rolesTable} r
      ON u.role_id = r.id
      WHERE u.?
    `;

    db.query(query, data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.findEmail = (email, data = false) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT ${data ? '*' : "COUNT(*) AS 'rows'"} FROM ${table} WHERE email = ?`, [email], (err, res) => {
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

exports.getUsers = (data) => {
  const {
    limit,
    page,
    name,
    email
  } = data;

  const offset = (page - 1) * limit;

  // const str = whereLikeCreator({
  //   name,
  //   email
  // });

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT id, name, email FROM ${table}
      WHERE name LIKE '${name}%' AND email LIKE '${email}%'
      LIMIT ? OFFSET ?`, [limit, offset], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.countUsers = (data = {}) => {
  const str = whereLikeCreator(data);

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT COUNT(*) AS 'rows' 
      FROM ${table}
      ${str}
      `, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
