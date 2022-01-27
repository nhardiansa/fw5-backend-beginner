const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vehicle_rent',
});

connection.connect();

module.exports = connection;
