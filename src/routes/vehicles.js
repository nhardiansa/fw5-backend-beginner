const express = require('express')
const vehicles = new express.Router()

const {
  getVehicles,
  getVehicle,
  addNewVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehicles')

vehicles.get('/', getVehicles)
vehicles.get('/:id', getVehicle)
vehicles.post('/', addNewVehicle)
vehicles.put('/:id', updateVehicle)
vehicles.delete('/:id', deleteVehicle)

module.exports = vehicles
