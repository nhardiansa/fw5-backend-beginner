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
const categoriesModel = require('../models/categories');

exports.getVehicles = async (req, res) => {
  try {
    const data = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 5,
      search: req.query.search || ''
    };

    const results = await vehiclesModel.getVehicles(data);
    const countResult = await vehiclesModel.countData();

    const pageInfo = pageInfoCreator(countResult[0].rows, `${baseURL}/vehicles?`, data);

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

exports.addNewVehicle = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      price: Number(req.body.price),
      prepayment: req.body.prepayment,
      capacity: Number(req.body.capacity),
      qty: Number(req.body.qty),
      location: req.body.location,
      category_id: req.body.category_id
    };

    const {
      prepayment
    } = data;

    if ((Number(prepayment) > 1 || Number(prepayment) < 0)) {
      return returningError(res, 400, 'Your data not validate');
    }

    if (!dataValidator(data)) {
      return res.status(400).json({
        success: false,
        message: 'Your data not validate'
      });
    }

    const existingCategory = await categoriesModel.getCategory(data.category_id);

    if (existingCategory.length < 1) {
      return returningError(res, 404, 'Category not found');
    }

    const existingVehicle = await vehiclesModel.checkExistVehicle(data);

    if (existingVehicle.length > 0) {
      return returningError(res, 400, 'Vehicle with inputed data already exist');
    }

    const results = await vehiclesModel.addNewVehicle(data);
    const vehicle = await vehiclesModel.getVehicle(results.insertId);

    return res.status(201).json({
      success: true,
      message: 'Success add new vehicle',
      results: vehicle[0]
    });
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to add new vehicle');
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const data = {
      name: req.body.name,
      price: Number(req.body.price),
      prepayment: req.body.prepayment,
      capacity: Number(req.body.capacity),
      qty: Number(req.body.qty),
      location: req.body.location,
      category_id: req.body.category_id
    };

    if (!validateId(id)) {
      return returningError(res, 404, 'Id not a number');
    }

    const {
      prepayment
    } = data;

    if (Number(prepayment) > 1 || Number(prepayment) < 0) {
      return returningError(res, 400, 'Your data not validate');
    }

    // validator data
    if (!dataValidator(data)) {
      return returningError(res, 400, 'Your data not validate');
    }

    const existingCategory = await categoriesModel.getCategory(data.category_id);

    if (existingCategory.length < 1) {
      return returningError(res, 404, 'Category not found');
    }

    const sameVehicle = await vehiclesModel.checkExistVehicle(data);

    if (sameVehicle.length > 0) {
      return returningError(res, 400, 'Vehicle with inputed data already exist');
    }

    const existingVehicle = await vehiclesModel.getVehicle(id);

    if (existingVehicle.length < 1) {
      return returningError(res, 404, 'Vehicle not found');
    }

    const results = await vehiclesModel.updateVehicle(id, data);

    if (results.affectedRows < 1) {
      return returningError(res, 500, 'Fail to update vehicle');
    }

    const vehicle = await vehiclesModel.getVehicle(id);

    return returningSuccess(res, 200, 'Success update vehicle', vehicle[0]);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to update vehicle');
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    if (!validateId(id)) {
      return returningError(res, 404, 'Id not a number');
    }

    const existingVehicle = await vehiclesModel.getVehicle(id);

    if (existingVehicle.length < 1) {
      return returningError(res, 404, 'Vehicle not found');
    }

    const results = await vehiclesModel.deleteVehicle(id);

    if (results.affectedRows < 1) {
      return returningError(res, 500, 'Failed to delete vehicle');
    }

    return returningSuccess(res, 200, 'Success delete vehicle', existingVehicle[0]);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to delete vehicle');
  }
};

exports.getPopularVehicles = async (req, res) => {
  try {
    const data = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 5,
      search: req.query.search || ''
    };

    const results = await vehiclesModel.getPopularVehicles(data);
    const resultCount = await vehiclesModel.countPopularVehicles();

    const pageInfo = pageInfoCreator(resultCount[0].rows, `${baseURL}/vehicles/popular?`, data);

    return returningSuccess(res, 200, 'List of popular vehicles', results, pageInfo);
  } catch (error) {
    console.log(error);
    return returningError(res, error, 'Failed to get popular vehicles');
  }
};

exports.getFilterVehicles = async (req, res) => {
  try {
    // return returningError(res, 500, 'Not yet implemented');
    const data = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 5,
      name: req.query.name || '',
      minPrice: Number(req.query.minPrice) || null,
      maxPrice: Number(req.query.maxPrice) || null,
      category_id: req.query.category_id || null,
      qty: Number(req.query.available) || null,
      prepayment: Number(req.query.prepayment) || null,
      location: req.query.location || '',
      sortPrice: req.query.sort_price || '',
      sortQty: req.query.sort_qty || '',
      sortCapacity: req.query.sort_capacity || ''
    };

    const existingCategory = await categoriesModel.getCategory(data.category_id);

    if (existingCategory.length < 1 && data.category_id) {
      return returningError(res, 404, 'Category not found');
    }

    const results = await vehiclesModel.getFilterVehicles(data);
    const resultCount = await vehiclesModel.countFilterVehicles(data);

    console.log(resultCount);

    const pageInfo = pageInfoCreator(resultCount[0].rows, `${baseURL}/vehicles/filter?`, data);

    return returningSuccess(res, 200, 'List of filter vehicles', results, pageInfo);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to get filter vehicles');
  }
};
