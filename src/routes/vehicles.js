const express = require('express');
const vehicles = new express.Router();

const {
  uploadMiddleware
} = require('../helpers/upload');

const auth = require('../middlewares/auth');

const {
  getVehicles,
  getVehicle,
  addNewVehicle,
  updateVehicle,
  deleteVehicle,
  getPopularVehicles,
  getFilterVehicles,
  updateVehiclePartial
} = require('../controllers/vehicles');

vehicles.get('/', getVehicles);
vehicles.get('/popular', getPopularVehicles);
vehicles.get('/filter', getFilterVehicles);
vehicles.get('/:id', getVehicle);

vehicles.post('/', auth.verifyAdmin, uploadMiddleware('image'), addNewVehicle);

vehicles.put('/:id', auth.verifyAdmin, uploadMiddleware('image'), updateVehicle);

vehicles.patch('/:id', auth.verifyAdmin, uploadMiddleware('image'), updateVehiclePartial);

vehicles.delete('/:id', auth.verifyAdmin, deleteVehicle);

module.exports = vehicles;
