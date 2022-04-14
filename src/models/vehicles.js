const db = require('../helpers/db');
const {
  customSpesificQuery
} = require('../helpers/queryCreator');
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
    SELECT v.id, v.name , v.price, v.prepayment, v.capacity, v.qty, v.location, v.image
    FROM ${table} v
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
    db.query(`
        SELECT v.id, v.name, v.price, v.prepayment, v.capacity, v.qty,
          SUM(( SELECT h.qty WHERE h.vehicle_id=${id} AND h.returned='0' )) AS booked,
        v.location, c.id AS category_id, c.name AS category_name, v.image, v.created_at, v.updated_at
        FROM ${table} v
        RIGHT JOIN ${historiesTable} h
        ON v.id=h.vehicle_id
        RIGHT JOIN ${categoryTable} c
        ON v.category_id = c.id
        WHERE v.id = ?
      `, [id], (err, results) => {
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
    const customQuery = customSpesificQuery(data);

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
    db.query(`SELECT id, name, price, prepayment, capacity, type, isAvailable, location FROM ${table} LIMIT = ? OFFSET = ?`, [page, limit], (err, results) => {
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
    name,
    location,
    category_id: categoryId,
    prepayment,
    sort_price: sortPrice
  } = data;
  const offset = (page - 1) * limit;

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT v.id, v.name, v.price, v.prepayment, v.capacity, v.qty, v.location, v.image, COUNT(*) AS rentCount 
      FROM ${table} v
      RIGHT JOIN ${historiesTable} h
      ON h.vehicle_id = v.id
      LEFT JOIN ${categoryTable} c
      ON v.category_id = c.id
      WHERE 
      v.name LIKE '${name || ''}%' AND
      ${categoryId ? `v.category_id = ${categoryId} AND` : ''}
      ${prepayment ? `v.prepayment = '${prepayment}' AND` : ''}
      v.location LIKE '%${location || ''}%'
      GROUP BY v.name
      ORDER BY
      ${sortPrice ? `v.price ${sortPrice},` : ''}
      rentCount DESC
      LIMIT ? OFFSET ?;
      `, [Number(limit), offset], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.countPopularVehicles = (data) => {
  const {
    name,
    location,
    category_id: categoryId,
    prepayment
  } = data;

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT COUNT(*) AS 'rows'
      FROM (
        SELECT v.id, v.name, v.price, v.prepayment, v.capacity, v.qty, v.location, COUNT(*) AS rentCount 
        FROM ${table} v
        RIGHT JOIN ${historiesTable} h
        ON h.vehicle_id = v.id
        LEFT JOIN ${categoryTable} c
        ON v.category_id = c.id
        WHERE 
        v.name LIKE '${name || ''}%' AND
        ${categoryId ? `v.category_id = ${categoryId} AND` : ''}
        ${prepayment ? `v.prepayment = '${prepayment}' AND` : ''}
        v.location LIKE '%${location || ''}%'
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
    vehicle_name: vehicleName,
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
    sort_capacity: sortCapacity,
    created,
    popularity
  } = data;

  const offset = (page - 1) * limit;

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT v.id, v.name, v.price, v.prepayment, v.capacity, v.qty, v.location, c.name AS type, COUNT(*) AS rent_count, v.image
      FROM ${table} v
      LEFT JOIN ${categoryTable} c
      ON v.category_id = c.id
      LEFT JOIN ${historiesTable} h
      ON h.vehicle_id = v.id
      WHERE
      v.name LIKE '%${vehicleName || ''}%' AND
      ${minPrice ? `v.price >= ${minPrice} AND` : ''}
      ${maxPrice ? `v.price <= ${maxPrice} AND` : ''}
      ${categoryId ? `v.category_id = ${categoryId} AND` : ''}
      ${qty ? `v.qty >= ${qty} AND` : ''}
      ${prepayment ? `v.prepayment = '${prepayment}' AND` : ''}
      v.location LIKE '%${location || ''}%'
      GROUP BY v.id
      ORDER BY
      ${popularity ? `rent_count ${popularity},` : ''}
      ${created ? `v.created_at ${created},` : ''}
      ${sortPrice ? `v.price ${sortPrice},` : ''}
      ${sortQty ? `v.qty ${sortQty},` : ''}
      ${sortCapacity ? `v.capacity ${sortCapacity},` : ''}
      v.id ASC
      LIMIT ? OFFSET ?;
    `, [Number(limit), offset], (err, results) => {
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
    vehicle_name: vehicleName,
    minPrice,
    maxPrice,
    category_id: categoryId,
    qty,
    prepayment,
    location
  } = data;

  return new Promise((resolve, reject) => {
    db.query(`
      SELECT COUNT(DISTINCT v.id) AS 'rows'
      FROM ${table} v
      LEFT JOIN ${categoryTable} c
      ON v.category_id = c.id
      LEFT JOIN ${historiesTable} h
      ON h.vehicle_id = v.id
      WHERE
      v.name LIKE '%${vehicleName || ''}%' AND
      ${minPrice ? `v.price >= ${minPrice} AND` : ''}
      ${maxPrice ? `v.price <= ${maxPrice} AND` : ''}
      ${categoryId ? `v.category_id = ${categoryId} AND` : ''}
      ${qty ? `v.qty >= ${qty} AND` : ''}
      ${prepayment ? `v.prepayment = '${prepayment}' AND` : ''}
      v.location LIKE '%${location || ''}%'
    `, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.locationList = () => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT DISTINCT location
      FROM ${table}
      ORDER BY location ASC;
    `, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
