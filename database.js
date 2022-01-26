const mysql = require('mysql');
const table = 'vehicle'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vehicle_rent'
})

module.exports = {
  checkingProduct: (connection, data) => {
    connection.query(`SELECT merk, brand FROM ${table} WHERE merk=? && brand=?`, data, (err, results) => {
      try {
        if (err) throw err;
        return results;
      } catch (error) {
        console.log(err, 'in checking product');
      }
    })
  },

  getVehicle: res => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      
      connection.query(`SELECT id, merk, brand, price FROM ${table}`, (error, results) => {
        if (error) throw error;
        
        return res.json({
          success: true,
          message: 'Berhasil mengambil data',
          data: results
        });
      });

      connection.release()
    })
  },

  getVehicleById: (id, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      
      connection.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (error, results) => {
        if (error) throw error;

        if (results.length == 0) {
          return res.json({
            success: false,
            message: `Data dengan id ${id} tidak ditemukan`,
          });
        }
        
        return res.json({
          success: true,
          message: `Berhasil mengambil data dengan id ${id}`,
          data: results
        });
      });

      connection.release()
    })
  },

  // insert a vehicle
  insertVehicle: (res, values) => {
    pool.getConnection((err, connection) => {
      if (err) throw err

      // const {merk, brand} = values;

      // connection.query(`SELECT merk, brand FROM ${table} WHERE merk=? && brand=?`, [merk, brand], (err, results) => {
      //   try {
      //     if (err) throw err;

      //     results.forEach(el => {
      //       if (el.merk === merk && el.brand === brand) {
      //         return res.json({
      //           success: true,
      //           message: 'Data telah terdaftar',
      //         });
      //       }
      //     });

      //     console.log(results);
      //   } catch (error) {
      //     console.log(err, 'in checking product');
      //   }
      // })

      connection.query(`INSERT INTO ${table} SET ?`, values, (error) => {
        try {
          if (error) throw error;
          
          return res.json({
            success: true,
            message: 'Berhasil menambahkan data',
          });
        } catch (error) {
          console.log(error);
        }
      });

      connection.release();
    })
  },

  // patch a vehicle
  updateVehicle: (res, id, values) => {
    pool.getConnection((err, connection) => {
      if (err) throw err

      connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [values, id], (error, results) => {
        try {
          if (error) throw error;
          
          if (results.affectedRows > 0) {
            return res.json({
              success: true,
              message: `Berhasil mengubah data dengan id ${id}`,
            });
          }
          
          return res.json({
            success: false,
            message: `Data dengan id ${id} tidak ditemukan`,
          });
        } catch (error) {
          console.log(error);
        }
      });

      connection.release();
    })
  },
  
  // delete a vehicle
  deleteVehicle: (res, id) => {
    pool.getConnection((err, connection) => {
      if (err) throw err

      connection.query(`DELETE FROM ${table} WHERE id = ?`, [id], (error, results) => {
        try {
          if (error) throw error;

          if (results.affectedRows > 0) {
            return res.json({
              success: true,
              message: `Berhasil menghapus data dengan id ${id}`,
            });
          }
          
          return res.json({
            success: false,
            message: `Data dengan id ${id} tidak ditemukan`,
          });
        } catch (error) {
          console.log(error);
        }
      });

      connection.release();
    })
  },
}