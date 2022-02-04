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

exports.checkExistVehicle = (data) => {
  return new Promise((resolve, reject) => {
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
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.addNewVehicle = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.updateVehicle = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.deleteVehicle = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
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

exports.getFilterVehicles = (data) => {
  const {
    name,
    minPrice,
    maxPrice,
    category_id: categoryId,
    qty,
    prepayment,
    location,
    limit,
    page,
    sort_price: sortPrice,
    sort_qty: sortQty,
    sort_capacity: sortCapacity
  } = data;

  const offset = (page - 1) * limit;

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT v.id, v.name, v.price, v.prepayment, v.capacity, v.qty, v.location, c.name AS type 
      FROM ${table} v
      LEFT JOIN ${categoryTable} c
      ON v.category_id = c.id
      WHERE
      v.name LIKE '%${name || ''}%' AND
      ${minPrice ? `v.price >= ${minPrice} AND` : ''}
      ${maxPrice ? `v.price <= ${maxPrice} AND` : ''}
      ${categoryId ? `v.category_id = ${categoryId} AND` : ''}
      ${qty ? 'v.qty > 0 AND' : ''}
      ${prepayment ? 'v.prepayment = 1 AND' : ''}
      v.location LIKE '%${location || ''}%'
      ORDER BY
      ${sortPrice ? `v.price ${sortPrice},` : ''}
      ${sortQty ? `v.qty ${sortQty},` : ''}
      ${sortCapacity ? `v.capacity ${sortCapacity},` : ''}
      v.id ASC
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

exports.countFilterVehicles = (data) => {
  const {
    name,
    minPrice,
    maxPrice,
    category_id: categoryId,
    qty,
    prepayment,
    location
  } = data;

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT COUNT(*) AS 'rows'
      FROM ${table} v
      LEFT JOIN ${categoryTable} c
      ON v.category_id = c.id
      WHERE
      v.name LIKE '%${name || ''}%' AND
      ${minPrice ? `v.price >= ${minPrice} AND` : ''}
      ${maxPrice ? `v.price <= ${maxPrice} AND` : ''}
      ${categoryId ? `v.category_id = ${categoryId} AND` : ''}
      ${qty ? 'v.qty > 0 AND' : ''}
      ${prepayment ? 'v.prepayment = 1 AND' : ''}
      v.location LIKE '%${location || ''}%';
    `, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
