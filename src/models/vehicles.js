const db = require('../helpers/db');
const table = 'vehicles';

module.exports = {
  getVehicles: (cb) => {
    db.query(`
    SELECT id, merk, brand, type, isAvailable, price FROM ${table}
  `, (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },

  getVehicle: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },

  checkExistVehicle: (data, cb) => {
    // make custom query depends keys of object
    let dataInArr = Object.keys(data);
    dataInArr = dataInArr.map((el) => {
      return `${el} = ?`;
    });
    const customQuery = dataInArr.join(' && ');

    // get values of data
    const dataValues = Object.values(data);
    const columns = Object.keys(data);

    db.query(`
    SELECT ?? FROM ${table} WHERE ${customQuery}
    `, [columns, ...dataValues], (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },

  insertVehicle: (data, cb) => {
    db.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },

  updateVehicle: (id, data, cb) => {
    db.query(`
    UPDATE ${table} SET ? WHERE id = ?
    `, [data, id], (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },

  deleteVehicle: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },
};
