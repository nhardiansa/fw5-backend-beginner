const mysql = require('mysql');
const table = 'vehicle'
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vehicle_rent'
})



module.exports = {
  getVehicle: res => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      
      connection.query(`SELECT * FROM ${table}`, (error, results) => {
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

  // insert a vehicle
  insertVehicle: (res, values) => {
    pool.getConnection((err, connection) => {
      if (err) throw err

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

      connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [values, id], (error) => {
        try {
          if (error) throw error;
          
          return res.json({
            success: true,
            message: `Berhasil mengubah data dengan id ${id}`,
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

      connection.query(`DELETE FROM ${table} WHERE id = ?`, [id], (error) => {
        try {
          if (error) throw error;
          
          return res.json({
            success: true,
            message: `Berhasil menghapus data dengan id ${id}`,
          });
        } catch (error) {
          console.log(error);
        }
      });

      connection.release();
    })
  },
}