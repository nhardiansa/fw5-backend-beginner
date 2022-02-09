const {
  baseURL
} = require('../helpers/constant');
const {
  validateId,
  requestMapping
} = require('../helpers/requestHandler');
const {
  returningSuccess,
  returningError,
  pageInfoCreator,
  dataMapping
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
    const rules = {
      name: 'string|required',
      price: 'number|required',
      prepayment: 'boolean|required',
      capacity: 'number|required',
      qty: 'number|required',
      location: 'string|required',
      category_id: 'number|required'
    };
    const data = requestMapping(req.body, rules);

    // console.log(data);

    // return returningError(res, 500, 'Not implemented yet');

    if (Object.keys(data).length < 1) {
      return returningError(res, 400, 'Data not validated');
    }

    for (const key in data) {
      if (data[key] === null) {
        return returningError(res, 400, `Your ${key} must be ${rules[key].split('|').shift()}`);
      }
    }

    const existingCategory = await categoriesModel.getCategory(data.category_id);

    if (existingCategory.length < 1) {
      return returningError(res, 404, 'Category not found');
    }

    const existingVehicle = await vehiclesModel.checkExistVehicle(data);

    if (existingVehicle.length > 0) {
      return returningError(res, 400, 'Vehicle with inputed data already exist');
    }

    if (!req.file) {
      return returningError(res, 400, 'Vehicle picture must be uploaded');
    }

    data.image = req.file.path;

    const results = await vehiclesModel.addNewVehicle(data);
    const vehicle = await vehiclesModel.getVehicle(results.insertId);

    return returningSuccess(res, 201, 'Success add new vehicle', dataMapping(vehicle)[0]);
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

    const rules = {
      name: 'string|required',
      price: 'number|required',
      prepayment: 'boolean|required',
      capacity: 'number|required',
      qty: 'number|required',
      location: 'string|required',
      category_id: 'number|required'
    };

    const data = requestMapping(req.body, rules);

    console.log(data);

    // return returningError(res, 500, 'Not implemented yet');

    if (!validateId(id)) {
      return returningError(res, 404, 'Id not a number');
    }

    if (Object.keys(data).length < 1) {
      return returningError(res, 400, 'Data not validated');
    }

    const {
      prepayment
    } = data;

    if (Number(prepayment) > 1 || Number(prepayment) < 0) {
      return returningError(res, 400, 'Your prepayment not validate');
    }

    // validator data
    for (const key in data) {
      if (data[key] === null) {
        return returningError(res, 400, `Your ${key} must be ${rules[key].split('|').shift()}`);
      }
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

    if (!req.file) {
      return returningError(res, 400, 'Vehicle picture must be uploaded');
    }

    data.image = req.file.path;

    const results = await vehiclesModel.updateVehicle(id, data);

    if (results.affectedRows < 1) {
      return returningError(res, 500, 'Fail to update vehicle');
    }

    const vehicle = await vehiclesModel.getVehicle(id);

    return returningSuccess(res, 200, 'Success update vehicle', dataMapping(vehicle)[0]);
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

    return returningSuccess(res, 200, 'Success delete vehicle', dataMapping(existingVehicle)[0]);
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
    const data = requestMapping(req.query, {
      name: 'string',
      minPrice: 'number',
      maxPrice: 'number',
      category_id: 'number',
      qty: 'boolean',
      prepayment: 'boolean',
      location: 'string',
      sort_price: 'sorter',
      sort_qty: 'sorter',
      sort_capacity: 'sorter'
    });

    data.page = Number(req.query.page) || 1;
    data.limit = Number(req.query.limit) || 5;

    if (data.category_id) {
      const existingCategory = await categoriesModel.getCategory(data.category_id);

      if (existingCategory.length < 1) {
        return returningError(res, 404, 'Category not found');
      }
    }

    const results = await vehiclesModel.getFilterVehicles(data);
    const resultCount = await vehiclesModel.countFilterVehicles(data);

    const pageInfo = pageInfoCreator(resultCount[0].rows, `${baseURL}/vehicles/filter?`, data);

    return returningSuccess(res, 200, 'List of filter vehicles', results, pageInfo);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to get filter vehicles');
  }
};

exports.updateVehiclePartial = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const data = requestMapping(req.body, {
      name: 'string',
      price: 'number',
      prepayment: 'boolean',
      capacity: 'number',
      qty: 'number',
      location: 'string',
      category_id: 'number'
    });

    if (!validateId(id)) {
      return returningError(res, 400, 'Id not a number');
    }

    if (Object.keys(data).length < 1) {
      return returningError(res, 400, 'Data not validated');
    }

    // checking duplicate vehicle name
    if (data.name) {
      const {
        name
      } = data;

      const duplicateName = await vehiclesModel.checkExistVehicle({
        name
      });

      if (duplicateName.length > 0) {
        return returningError(res, 400, 'Vehicle name already exist');
      }
    }

    const vehicle = await vehiclesModel.getVehicle(id);

    if (vehicle.length < 1) {
      return returningError(res, 404, 'Vehicle not found');
    }

    const warn = [];
    let strWarning = '';
    for (const key in data) {
      if (data[key] === null) {
        warn.push(key);
        delete data[key];
      }
    }

    if (warn.length > 0) {
      strWarning = `Some data updated but can't for ${warn.length > 0 ? warn.join(', ') : warn[0]} because data not valid`;
    }

    const results = await vehiclesModel.updateVehicle(id, data);

    if (results.affectedRows < 1) {
      return returningError(res, 500, 'Something wrong when updating vehicle');
    }

    const vehicleUpdated = await vehiclesModel.getVehicle(id);

    return returningSuccess(res, 200, strWarning || 'Success update vehicle', vehicleUpdated[0]);
    // return returningError(res, 500, 'Not yet implemented');
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to update vehicle');
  }
};
