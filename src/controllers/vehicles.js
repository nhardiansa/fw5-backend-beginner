const {
  baseURL
} = require('../helpers/constant');
const {
  dataValidator,
  validateId
} = require('../helpers/requestHandler');
const {
  returningSuccess,
  returningError,
  pageInfoCreator
} = require('../helpers/responseHandler');
const vehiclesModel = require('../models/vehicles');

exports.getVehicles = async (req, res) => {
  try {
    const data = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 5,
      search: req.query.search || ''
    };

    const {
      page,
      limit,
      search
    } = data;

    const offset = (page - 1) * limit;
    const results = await vehiclesModel.getVehicles(limit, offset, search);
    const countData = await vehiclesModel.countData();
    const pageInfo = pageInfoCreator(countData, `${baseURL}/vehicles?`, data);

    return returningSuccess(res, 200, 'List of vehicles', results, pageInfo);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to get vehicles');
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    if (!validateId(id)) {
      return returningError(res, 404, 'Id not a number');
    }

    const vehicle = await vehiclesModel.getVehicle(id);

    if (vehicle.length < 1) {
      return returningError(res, 404, 'Vehicle not found');
    }

    return returningSuccess(res, 200, 'Success get vehicle', vehicle[0]);
  } catch (error) {
    console.log(error);
    return returningError(res, 500, "Can't get vehicle");
  }
};

exports.addNewVehicle = (req, res) => {
  const clientData = {
    merk: req.body.merk,
    price: Number(req.body.price),
    prepayment: req.body.prepayment,
    capacity: Number(req.body.capacity),
    type: req.body.type,
    isAvailable: Number(req.body.isAvailable),
    location: req.body.location
  };

  console.log(clientData);

  const prepayment = clientData.prepayment;

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
          prepayment: Number(clientData.prepayment)
        }
      });
    });
  });
};

exports.updateVehicle = (req, res) => {
  const {
    id
  } = req.params;

  const clientData = {
    merk: req.body.merk,
    price: Number(req.body.price),
    prepayment: req.body.prepayment,
    capacity: Number(req.body.capacity),
    type: req.body.type,
    isAvailable: Number(req.body.isAvailable),
    location: req.body.location
  };

  const prepayment = clientData.prepayment;

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
          id: Number(id),
          ...clientData,
          prepayment: Number(clientData.prepayment)
        }
      });
    });
  });
};

exports.deleteVehicle = (req, res) => {
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
};

exports.getPopularVehicles = async (req, res) => {
  try {
    const results = await vehiclesModel.getPopularVehicles();
    return returningSuccess(res, 200, 'List of popular vehicles', results);
  } catch (error) {
    console.log(error);
    return returningError(res, error, 'Failed to get popular vehicles');
  }
};
