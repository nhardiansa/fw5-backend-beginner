const express = require('express');
const vehicles = new express.Router();

const {
  uploadMiddleware
} = require('../helpers/upload');
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
vehicles.post('/', uploadMiddleware('image'), addNewVehicle);
vehicles.put('/:id', uploadMiddleware('image'), updateVehicle);
vehicles.patch('/:id', uploadMiddleware('image'), updateVehiclePartial);
vehicles.delete('/:id', deleteVehicle);

module.exports = vehicles;
