const vehicles = require('express').Router()

const { getVehicles } = require('../controllers/vehicles')

vehicles.get('/', getVehicles)

module.exports = vehicles;
