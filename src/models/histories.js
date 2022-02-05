const db = require('../helpers/db');
const table = require('../helpers/constant').historiesTable;
const {
  vehiclesTable,
  categoriesTable
} = require('../helpers/constant');

exports.getHistories = (keys, data) => {
  const {
    id,
    limit,
    page
  } = data;

  const offset = (page - 1) * limit;

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT ?? FROM ${table}
      ${id ? `WHERE user_id = ${id}` : ''}
      LIMIT ? OFFSET ?
    `, [keys, limit, offset], (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.addHistory = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.deleteHistory = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getHistory = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.updateHistory = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.countHistories = (id = null) => {
  return new Promise((resolve, reject) => {
    db.query(`
        SELECT COUNT(*) AS 'rows' 
        FROM ${table}
        ${id ? `WHERE user_id = ${id}` : ''}
      `, (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getFilteredHistories = (data) => {
  const {
    user_id: userId,
    start_rent: startRent,
    category_id: categoryId,
    vehicle_name: vehicleName,
    limit,
    page,
    sort_date: sortDate,
    sort_name: sortName,
    sort_returned: sortReturned,
    sort_payment: sortPayment
  } = data;

  const offset = (page - 1) * limit;

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT h.id, h.payment, h.returned, h.prepayment, h.start_rent, h.end_rent, v.name, c.name as type
      FROM ${table} h
      LEFT JOIN ${vehiclesTable} v
      ON h.vehicle_id = v.id
      LEFT JOIN ${categoriesTable} c
      ON v.category_id = c.id
      WHERE 
      h.user_id = ${userId}
      ${startRent ? `AND h.start_rent >= '${startRent}'` : ''}
      ${categoryId ? `AND v.category_id = ${categoryId}` : ''}
      AND v.name LIKE '%${vehicleName}%'
      ORDER BY
      ${sortDate ? `h.start_rent ${sortDate},` : ''}
      ${sortName ? `v.name ${sortName},` : ''}
      ${sortReturned ? `h.returned ${sortReturned},` : ''}
      ${sortPayment ? `h.payment ${sortPayment},` : ''}
      h.id ASC
      LIMIT ? OFFSET ?
    `, [limit, offset], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getFilteredHistoriesCount = (data) => {
  const {
    user_id: userId,
    start_rent: startRent,
    category_id: categoryId,
    vehicle_name: vehicleName
  } = data;

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT COUNT(*) AS 'rows' 
      FROM ${table} h
      LEFT JOIN ${vehiclesTable} v
      ON h.vehicle_id = v.id
      LEFT JOIN ${categoriesTable} c
      ON v.category_id = c.id
      WHERE 
      h.user_id = ${userId}
      ${startRent ? `AND h.start_rent = '${startRent}'` : ''}
      ${categoryId ? `AND v.category_id = ${categoryId}` : ''}
      AND v.name LIKE '%${vehicleName}%'
    `, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
