const db = require('../helpers/db');
const table = require('../helpers/constant').historiesTable;
const {
  vehiclesTable,
  categoriesTable
} = require('../helpers/constant');
const {
  dateNow
} = require('../helpers/date');

// exports.getHistories = (keys, data) => {
//   const {
//     id,
//     limit,
//     page
//   } = data;

//   const offset = (page - 1) * limit;

//   return new Promise((resolve, reject) => {
//     db.query(`
//       SELECT ?? FROM ${table}
//       ${id ? `WHERE user_id = ${id}` : ''}
//       LIMIT ? OFFSET ?
//     `, [keys, limit, offset], (err, results) => {
//       if (err) {
//         console.error(err);
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

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

exports.deleteHistoryUser = (id) => {
  return new Promise((resolve, reject) => {
    const time = dateNow();

    db.query(`UPDATE ${table} SET deleted_at = ? WHERE id = ?`, [time, id], (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.deleteHistoryUserPermanent = (id) => {
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

exports.getHistory = (data) => {
  const { id, userId } = data;
  return new Promise((resolve, reject) => {
    const query = `
      SELECT ${table}.*, (${vehiclesTable}.price * ${table}.qty) as total_paid
      FROM ${table}
      LEFT JOIN ${vehiclesTable}
      ON ${table}.vehicle_id = ${vehiclesTable}.id
      WHERE ${table}.id = ? ${userId ? `AND ${table}.user_id = ${userId}` : ''}
    `;
    db.query(query, [Number(id)], (err, results) => {
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

// exports.countHistories = (id = null) => {
//   return new Promise((resolve, reject) => {
//     db.query(`
//         SELECT COUNT(*) AS 'rows'
//         FROM ${table}
//         ${id ? `WHERE user_id = ${id}` : ''}
//       `, (err, results) => {
//       if (err) {
//         console.error(err);
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

/* =============== List of Histories with filter feature =============== */

exports.getHistories = (data) => {
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
    sort_payment: sortPayment,
    created,
    admin
  } = data;

  const offset = (page - 1) * limit;

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT h.id, h.payment, h.returned, h.prepayment, h.start_rent, h.end_rent, v.name, c.name as type, v.image as image
      FROM ${table} h
      LEFT JOIN ${vehiclesTable} v
      ON h.vehicle_id = v.id
      LEFT JOIN ${categoriesTable} c
      ON v.category_id = c.id
      WHERE 
      v.name LIKE '%${vehicleName || ''}%'
      ${startRent ? `AND h.start_rent >= '${startRent}'` : ''}
      ${categoryId ? `AND v.category_id = ${categoryId}` : ''}
      ${userId ? `AND h.user_id = ${userId}` : ''}
      ${admin ? '' : 'AND deleted_at IS NULL'}
      ORDER BY
      ${created ? `h.created_at ${created},` : ''}
      ${sortDate ? `h.start_rent ${sortDate},` : ''}
      ${sortName ? `v.name ${sortName},` : ''}
      ${sortReturned ? `h.returned ${sortReturned},` : ''}
      ${sortPayment ? `h.payment ${sortPayment},` : ''}
      h.id ASC
      LIMIT ? OFFSET ?
    `, [Number(limit), Number(offset)], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getHistoriesCount = (data) => {
  const {
    user_id: userId,
    start_rent: startRent,
    category_id: categoryId,
    vehicle_name: vehicleName,
    admin
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
      v.name LIKE '%${vehicleName || ''}%'
      ${startRent ? `AND h.start_rent = '${startRent}'` : ''}
      ${categoryId ? `AND v.category_id = ${categoryId}` : ''}
      ${userId ? `AND h.user_id = ${userId}` : ''}
      ${admin ? '' : 'AND deleted_at IS NULL'}
    `, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
