const db = require('../helpers/db');
const table = 'vehicles'

module.exports = {
  getVehicles: (cb) => {
    db.query(`SELECT id, merk, brand, type, isAvailable, price FROM ${table}`, (err, results) => {
      if (err) throw err;
      cb(results)
    })
  },
}