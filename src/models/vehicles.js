const db = require('../helpers/db');
const table = require('../helpers/constant').vehiclesTable;

exports.getVehicles = (limit, offset, search) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT id, merk, price, prepayment, capacity, type, isAvailable, location 
    FROM ${table} WHERE merk LIKE '${search}%' 
    LIMIT ? OFFSET ?`, [limit, offset], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getVehicle = (id, cb) => {
  db.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.checkExistVehicle = (data, cb) => {
  // make custom query depends keys of object
  let dataInArr = Object.keys(data);
  dataInArr = dataInArr.map((el) => {
    return `${el} = ?`;
  });
  const customQuery = dataInArr.join(' && ');

  // get values of data
  const dataValues = Object.values(data);
  const columns = Object.keys(data);

  db.query(`SELECT ?? FROM ${table} WHERE ${customQuery}`, [columns, ...dataValues], (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.insertVehicle = (data, cb) => {
  db.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.updateVehicle = (id, data, cb) => {
  db.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.deleteVehicle = (id, cb) => {
  db.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.listLimitVehicle = (page, limit) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT id, merk, price, prepayment, capacity, type, isAvailable, location FROM ${table} LIMIT = ? OFFSET = ?`, [page, limit], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.countData = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) AS 'row' FROM ${table};`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getPopularVehicles = () => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT id, merk, price, capacity, isAvailable, location 
      FROM ${table} ORDER BY 'rentCount'  DESC`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
