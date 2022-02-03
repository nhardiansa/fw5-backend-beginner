const db = require('../helpers/db');
const table = require('../helpers/constant').vehiclesTable;
const categoryTable = require('../helpers/constant').categoriesTable;
const historiesTable = require('../helpers/constant').historiesTable;

exports.getVehicles = (data) => {
  const {
    limit,
    page,
    search
  } = data;
  const offset = (page - 1) * limit;

  return new Promise((resolve, reject) => {
    db.query(`
    SELECT v.id, v.name as merk, v.price, v.prepayment, v.capacity, v.qty, c.name as type, v.location 
    FROM ${table} v
    LEFT JOIN ${categoryTable} c
    ON v.category_id = c.id
    WHERE v.name LIKE '${search}%' 
    LIMIT ? OFFSET ?`, [limit, offset], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getVehicle = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
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
    db.query(`SELECT COUNT(*) AS 'rows' FROM ${table};`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getPopularVehicles = (data) => {
  const {
    limit,
    page,
    search
  } = data;
  const offset = (page - 1) * limit;

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT v.id, v.name as merk, v.price, v.prepayment, v.capacity, v.qty, c.name as type, v.location 
      FROM ${table} v
      LEFT JOIN ${categoryTable} c
      ON v.category_id = c.id
      WHERE v.name LIKE '${search}%'
      ORDER BY v.rentCount  DESC
      LIMIT ? OFFSET ?`, [limit, offset], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getPopularVehicles = (data) => {
  const {
    limit,
    page,
    search
  } = data;
  const offset = (page - 1) * limit;

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT v.id, v.name AS merk, v.price, v.prepayment, v.capacity, v.qty, v.location, COUNT(*) AS rentCount 
      FROM ${table} v
      RIGHT JOIN ${historiesTable} h
      ON h.vehicle_id = v.id
      LEFT JOIN ${categoryTable} c
      ON v.category_id = c.id
      WHERE v.name LIKE '${search}%'
      GROUP BY v.name
      ORDER BY rentCount DESC
      LIMIT ? OFFSET ?;
      `, [limit, offset], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.countPopularVehicles = () => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT COUNT(*) AS 'rows'
      FROM (
        SELECT v.id, v.name AS merk, v.price, v.prepayment, v.capacity, v.qty, v.location, COUNT(*) AS rentCount 
        FROM ${table} v
        RIGHT JOIN ${historiesTable} h
        ON h.vehicle_id = v.id
        LEFT JOIN ${categoryTable} c
        ON v.category_id = c.id
        GROUP BY v.name
      ) AS t;
      `, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
