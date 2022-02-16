const {
  dateNow
} = require('../helpers/date');
const db = require('../helpers/db');
const table = require('../helpers/constant').otpCodes;

exports.insertRequest = (id, code, reset = false) => {
  return new Promise((resolve, reject) => {
    const data = {
      user_id: id,
      code,
      type: `${reset ? 'reset' : 'verify'}`
    };

    const query = `INSERT INTO ${table} SET ?`;
    db.query(query, data, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.findCode = (code, userId, type) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${table} WHERE code = ? AND is_expired=0 AND user_id = ? AND type = ?`;

    db.query(query, [code, userId, type], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.setExpiryCode = (id) => {
  return new Promise((resolve, reject) => {
    const time = dateNow();
    const query = `UPDATE ${table} SET is_expired=1, expired_at=? WHERE id=? AND is_expired=0`;

    const ss = db.query(query, [time, id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });

    console.log(ss.sql);
  });
};

exports.setExpiryCodeMass = (userId) => {
  return new Promise((resolve, reject) => {
    const time = dateNow();
    const query = `UPDATE ${table} SET is_expired=1, expired_at=? WHERE user_id = ? AND is_expired=0`;

    db.query(query, [time, userId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.deleteCode = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM ${table} WHERE id = ?`;

    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getCodeByUserId = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${table} WHERE user_id = ? AND is_expired=0 ORDER BY created_at DESC`;

    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
