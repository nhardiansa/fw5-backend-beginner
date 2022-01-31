const {
  dataValidator
} = require('../helpers/validator');
const vehiclesModel = require('../models/vehicles');

module.exports = {
  getVehicles: (req, res) => {
    const keys = [
      'id',
      'merk',
      'capacity',
      'location',
      'isAvailable',
      'has_prepayment',
      'price'
    ];
    vehiclesModel.getVehicles(keys, (results) => {
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
    vehiclesModel.getVehicle(id, (results) => {
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
    const clientData = {
      merk: req.body.merk,
      price: Number(req.body.price),
      has_prepayment: req.body.has_prepayment,
      capacity: Number(req.body.capacity),
      type: req.body.type,
      isAvailable: Number(req.body.isAvailable),
      location: req.body.location
    };

    console.log(clientData);

    const prepayment = clientData.has_prepayment;

    if (Number(prepayment) > 1 || Number(prepayment) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Your data not validate'
      });
    }

    if (!dataValidator(clientData)) {
      return res.status(400).json({
        success: false,
        message: 'Your data not validate'
      });
    }

    vehiclesModel.checkExistVehicle(clientData, (checkResults) => {
      if (checkResults.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Vehicle already exist'
        });
      }

      vehiclesModel.insertVehicle(clientData, (results) => {
        console.log(results);
        return res.status(201).json({
          success: true,
          message: 'Success add new vehicle',
          results: {
            ...clientData,
            has_prepayment: Number(clientData.has_prepayment)
          }
        });
      });
    });
  },

  updateVehicle: (req, res) => {
    const {
      id
    } = req.params;

    const clientData = {
      merk: req.body.merk,
      price: Number(req.body.price),
      has_prepayment: req.body.has_prepayment,
      capacity: Number(req.body.capacity),
      type: req.body.type,
      isAvailable: Number(req.body.isAvailable),
      location: req.body.location
    };

    const prepayment = clientData.has_prepayment;

    if (Number(prepayment) > 1 || Number(prepayment) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Your data not validate'
      });
    }

    // validator data
    if (!dataValidator(clientData)) {
      return res.status(400).json({
        success: false,
        message: 'Your data not validate'
      });
    }

    vehiclesModel.checkExistVehicle(clientData, (checkResults) => {
      // check if the data is changed or not
      if (checkResults.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Vehicle with inputed data already exist'
        });
      }

      vehiclesModel.updateVehicle(id, clientData, (results) => {
        if (results.affectedRows < 1) {
          return res.status(404).json({
            success: false,
            message: `Vehicle with id ${id} not found`
          });
        }
        return res.status(200).json({
          success: true,
          message: `Success update vehicle with id ${id}`,
          results: {
            id,
            ...clientData,
            has_prepayment: Number(clientData.has_prepayment)
          }
        });
      });
    });
  },

  deleteVehicle: (req, res) => {
    const {
      id
    } = req.params;

    vehiclesModel.deleteVehicle(id, (results) => {
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
