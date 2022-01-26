const express = require('express')
const database = require('./database');

const app = express();
const PORT = 5000

app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: "Welcom to vehicle rent app"
  })
})

// List vehicle
app.get('/vehicles', (req, res) => {
  database.getVehicle(res);
})

// Get a vehicle by Id
app.get('/vehicle/:id', (req, res) => {
  const {id} = req.params
  database.getVehicleById(Number(id), res);
})

// Insert a vehicle
app.post('/vehicle', (req, res) => {
  const {merk, brand, type, price} = req.body
  const data = {merk, brand, type, price: Number(price)}

  database.insertVehicle(res, data);
})

// update a vehicle
app.patch('/vehicle/:id', (req, res) => {
  const {id} = req.params
  const {merk, brand, type, price} = req.body
  const data = {merk, brand, type, price: Number(price)}

  database.updateVehicle(res, id, data);
})

// delete a vehicle
app.delete('/vehicle/:id', (req, res) => {
  const {id} = req.params
  database.deleteVehicle(res, id);
})

app.listen(PORT, () => {
  console.log(`App is running in port ${PORT}`);
})