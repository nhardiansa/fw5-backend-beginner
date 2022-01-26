const vehiclesModel = require("../models/vehicles");

module.exports = {
  getVehicles: (req, res) => {
    vehiclesModel.getVehicles(results => {
      return res.json({
        success: true,
        message: 'List Vehicles',
        results
      })
    })
  },
};