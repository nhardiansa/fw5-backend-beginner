const db = require('../helpers/db');
const vehiclesTable = 'vehicles';

exports.getVehicles = (limit, offset) => {
  return new Promise((resolve, reject) => {
    const ss = db.query(`
    SELECT id, merk, price, has_prepayment, capacity, type, isAvailable, location 
    FROM ${vehiclesTable} LIMIT ? OFFSET ?`, [limit, offset], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
    console.log(ss.sql);
  });
};

exports.getVehicle = (id, cb) => {
  db.query(`SELECT * FROM ${vehiclesTable} WHERE id = ?`, [id], (err, results) => {
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

  db.query(`SELECT ?? FROM ${vehiclesTable} WHERE ${customQuery}`, [columns, ...dataValues], (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.insertVehicle = (data, cb) => {
  db.query(`INSERT INTO ${vehiclesTable} SET ?`, data, (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.updateVehicle = (id, data, cb) => {
  db.query(`UPDATE ${vehiclesTable} SET ? WHERE id = ?`, [data, id], (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.deleteVehicle = (id, cb) => {
  db.query(`DELETE FROM ${vehiclesTable} WHERE id = ?`, [id], (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.listLimitVehicle = (page, limit) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT id, merk, price, has_prepayment, capacity, type, isAvailable, location FROM ${vehiclesTable} LIMIT = ? OFFSET = ?`, [page, limit], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.countPage = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) AS 'row' FROM ${vehiclesTable};`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
