const {
  dataValidator
} = require('../helpers/validator');
const vehiclesModel = require('../models/vehicles');

module.exports = {
  getVehicles: (req, res) => {
    vehiclesModel.getVehicles(results => {
      return res.json({
        success: true,
        message: 'List Vehicles',
        results
      });
    });
  },

  getVehicle: (req, res) => {
    const {
      id
    } = req.params;
    vehiclesModel.getVehicle(id, results => {
      if (results.length < 1) {
        return res.status(404).json({
          success: false,
          message: `Vehicle with id ${id} not found`
        });
      }
      return res.status(200).json({
        success: true,
        message: `Success getting vehicle with id ${id}`,
        result: results[0]
      });
    });
  },

  addNewVehicle: (req, res) => {
    const newData = {
      merk: req.body.merk,
      brand: req.body.brand,
      type: req.body.type,
      price: req.body.price,
      isAvailable: req.body.isAvailable
    };

    if (!dataValidator(newData)) {
      return res.status(400).json({
        success: false,
        message: 'Your data not validate'
      });
    }

    return res.status(200).json({
      success: false,
      message: 'debug'
    });

    // const checkExisting = [newData.merk, newData.brand, newData.type];

    // vehiclesModel.checkExistVehicle(checkExisting, results => {
    //   if (results.length > 0) {
    //     return res.status(200).json({
    //       success: false,
    //       message: 'Vehicle already exist',
    //       results
    //     })
    //   }

    //   vehiclesModel.insertVehicle(newData, results => {
    //     console.log(results)
    //     return res.status(201).json({
    //       success: true,
    //       message: 'Success add new vehicle'
    //     })
    //   })
    // })
  },

  updateVehicle: (req, res) => {
    const {
      id
    } = req.params;

    const newData = {
      merk: req.body.merk,
      brand: req.body.brand,
      type: req.body.type,
      price: req.body.price,
      isAvailable: req.body.isAvailable
    };

    vehiclesModel.updateVehicle(id, newData, results => {
      if (results.affectedRows < 1) {
        return res.status(404).json({
          success: false,
          message: `Vehicle with id ${id} not found`
        });
      }
      return res.status(200).json({
        success: true,
        message: `Success update vehicle with id ${id}`
      });
    });
  },

  deleteVehicle: (req, res) => {
    const {
      id
    } = req.params;

    vehiclesModel.deleteVehicle(id, results => {
      if (results.affectedRows < 1) {
        return res.status(404).json({
          success: false,
          message: `Vehicle with id ${id} not found`
        });
      }
      return res.status(200).json({
        success: true,
        message: `Success delete vehicle with id ${id}`
      });
    });
  }
};