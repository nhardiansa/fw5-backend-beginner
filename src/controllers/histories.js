const {
  baseURL
} = require('../helpers/constant');
const {
  dataValidator,
  requestReceiver,
  validateId,
  requestMapping
} = require('../helpers/requestHandler');
const {
  returningError,
  returningSuccess,
  pageInfoCreator
} = require('../helpers/responseHandler');

const historiesModel = require('../models/histories');
const usersModel = require('../models/users');
const vehicleModel = require('../models/vehicles');
const categoryModel = require('../models/categories');

const codeGenerator = (vehicleName) => {
  const vokal = ['a', 'i', 'u', 'e', 'o'];
  const num = Date.now().toString();

  const result = vehicleName.split(' ')[0]
    .split('')
    .filter(el => !vokal.includes(el))
    .join('');

  return result + num;
};

exports.listHistories = async (req, res) => {
  try {
    const id = Number(req.query.user_id) || null;
    const data = {
      limit: Number(req.query.limit) || 5,
      page: Number(req.query.page) || 1
    };
    const keys = [
      'id', 'user_id', 'vehicle_id', 'payment_code', 'payment', 'returned',
      'prepayment'
    ];

    if (!validateId(id) || id === null) {
      return returningError(res, 400, 'user_id must be a number');
    }

    const results = await historiesModel.getHistories(keys, {
      ...data,
      id
    });

    const countHistories = await historiesModel.countHistories(id);
    const countResult = countHistories[0].rows;

    const pageInfo = pageInfoCreator(countResult, `${baseURL}/histories?`, {
      ...data,
      user_id: id
    });

    return returningSuccess(res, 200, 'Success getting histories', results, pageInfo);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to get list of history');
  }
};

exports.addHistory = async (req, res) => {
  try {
    const rules = {
      user_id: 'number',
      vehicle_id: 'number',
      payment: 'boolean',
      returned: 'boolean',
      prepayment: 'number',
      qty: 'number',
      start_rent: 'date',
      end_rent: 'date'
    };

    const data = requestMapping(req.body, rules);

    const reValidate = requestReceiver(data, [
      'user_id', 'vehicle_id', 'payment', 'returned', 'prepayment', 'qty', 'start_rent', 'end_rent'
    ]);

    // validate inputed data
    if (!dataValidator(reValidate)) {
      return returningError(res, 400, 'Data not validated');
    }

    // return returningError(res, 500, 'Not yet implemented');

    // check if user exist
    const user = await usersModel.getUser(data.user_id);

    if (user.length < 1) {
      return returningError(res, 404, 'User not found');
    }

    // check if vehicle exist
    const vehicle = await vehicleModel.getVehicle(data.vehicle_id);

    if (vehicle.length < 1) {
      return returningError(res, 404, 'Vehicle not found');
    }

    const paymentCode = codeGenerator(vehicle[0].name);
    data.payment_code = paymentCode;

    // check if history has beed added
    const historyResult = await historiesModel.addHistory(data);

    if (historyResult.affectedRows < 1) {
      return returningError(res, 500, "Can't add history");
    }

    const history = await historiesModel.getHistory(historyResult.insertId);

    return returningSuccess(res, 201, 'History has been added', history[0]);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to add history');
  }
};

exports.deleteHistory = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    // validate inputed id
    if (!validateId(id)) {
      return returningError(res, 400, 'Id must be a number');
    }

    // check if history exist
    const history = await historiesModel.getHistory(id);

    // if history exist
    if (history.length > 0) {
      // delete history
      const result = await historiesModel.deleteHistory(id);

      // if history can't to delete
      if (result.affectedRows < 1) {
        return returningError(res, 500, "Can't delete history");
      }

      // if history deleted
      return returningSuccess(res, 200, 'History has been deleted', history[0]);
    }

    // if history not exist
    return returningError(res, 404, 'History not found');
  } catch (error) {
    // if error exist
    console.log(error);
    return returningError(res, 500, 'Failed to delete history');
  }
};

exports.upadateHistory = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const data = requestMapping(req.body, {
      payment: 'boolean',
      returned: 'boolean',
      prepayment: 'number'
    });

    if (Object.keys(data).length < 1) {
      return returningError(res, 400, 'Data not validated');
    }

    // validate inputed id
    if (!validateId(id)) {
      return returningError(res, 400, 'Id must be a number');
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

    // check if history exist
    const history = await historiesModel.getHistory(id);

    // if history not exist
    if (history.length < 1) {
      return returningError(res, 404, 'History not found');
    }

    // update history
    const result = await historiesModel.updateHistory(id, data);

    // if history can't to update
    if (result.affectedRows < 1) {
      return returningError(res, 500, "Can't update history");
    }

    // get updated history
    const updatedHistory = await historiesModel.getHistory(id);

    return returningSuccess(res, 200, strWarning || 'History has been updated', updatedHistory[0]);
  } catch (error) {
    console.log(error);
    console.error(error);
    return returningError(res, 500, 'Failed to update history');
  }
};

exports.getHistory = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    // validate inputed id
    if (!validateId(id)) {
      return returningError(res, 400, 'Id must be a number');
    }

    const result = await historiesModel.getHistory(id);

    // if history not exist
    if (result.length < 1) {
      return returningError(res, 404, 'History not found');
    }

    return returningSuccess(res, 200, 'Success getting history', result[0]);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to get history');
  }
};

exports.getFilteredHistories = async (req, res) => {
  try {
    const data = requestMapping(req.query, {
      user_id: 'number',
      category_id: 'number',
      vehicle_name: 'string',
      start_rent: 'sorter',
      sort_date: 'sorter',
      sort_name: 'sorter',
      sort_returned: 'sorter',
      sort_payment: 'sorter'
    });

    data.limit = Number(req.query.limit) || 5;
    data.page = Number(req.query.limit) || 1;

    const user = await usersModel.getUser(data.user_id);

    if (user.length < 1) {
      return returningError(res, 404, 'User not found');
    }

    if (data.category_id !== null && data.category_id) {
      if (!validateId(data.category_id)) {
        return returningError(res, 400, 'Category id must be a number');
      }

      const category = await categoryModel.getCategory(data.category_id);

      if (category.length < 1) {
        return returningError(res, 404, 'Category not found');
      }
    }

    const histories = await historiesModel.getFilteredHistories(data);
    const historiesCount = await historiesModel.getFilteredHistoriesCount(data);

    const pageInfo = pageInfoCreator(historiesCount[0].rows, `${baseURL}/histories`, data);

    return returningSuccess(res, 200, 'Success getting histories', histories, pageInfo);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to get filtered histories');
  }
};
