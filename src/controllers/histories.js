const {
  baseURL
} = require('../helpers/constant');
const {
  dataValidator,
  requestReceiver,
  validateId
} = require('../helpers/requestHandler');
const {
  returningError,
  returningSuccess,
  pageCreator
} = require('../helpers/responseHandler');

const historiesModel = require('../models/histories');
const usersModel = require('../models/users');
const vehicleModel = require('../models/vehicles');

exports.listHistories = async (req, res) => {
  try {
    const data = {
      id: Number(req.query.user_id) || null,
      limit: Number(req.query.limit) || 5,
      page: Number(req.query.page) || 0
    };
    const keys = [
      'id', 'user_id', 'vehicle_id', 'payment_code', 'payment', 'returned',
      'prepayment'
    ];

    const results = await historiesModel.getHistories(keys, data);

    const countHistories = await historiesModel.countHistories(data.id);
    const totalHistories = countHistories[0].total;

    const totalPages = Math.ceil(totalHistories / data.limit);

    const pages = pageCreator(`${baseURL}/histories?`, {
      page: data.page,
      limit: data.limit
    });

    const pageInfo = {
      totalHistories,
      currentPage: data.page,
      nextPage: data.page < totalPages ? pages.next : null,
      prevPage: data.page > 1 ? pages.prev : null,
      lastPage: totalPages
    };

    return returningSuccess(res, 200, 'Success getting histories', results, pageInfo);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to get list of history');
  }
};

exports.addHistory = async (req, res) => {
  try {
    const keys = [
      'user_id',
      'vehicle_id',
      'payment_code',
      'payment',
      'returned',
      'prepayment'
    ];
    const data = requestReceiver(req.body, keys);

    // validate inputed data
    const isValidate = dataValidator(data);

    if (!isValidate) {
      return res.status(400).json({
        success: true,
        message: 'Data not validate'
      });
    }

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

    // check if history has beed added
    const historyResult = await historiesModel.addHistory(data);

    if (historyResult.affectedRows < 1) {
      return returningError(res, 500, "Can't add history");
    }

    const history = await historiesModel.getHistory(historyResult.insertId);

    return returningSuccess(res, 201, 'History has been added', history[0]);
  } catch (error) {
    console.log(error);
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
    const keys = [
      'payment', 'returned', 'prepayment'
    ];
    const data = requestReceiver(req.body, keys);

    // validate inputed id
    if (!validateId(id)) {
      return returningError(res, 400, 'Id must be a number');
    }

    // validate inputed data
    const isValidate = dataValidator(data);

    if (!isValidate) {
      return returningError(res, 400, 'Data not validate');
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

    return returningSuccess(res, 200, 'History has been updated', updatedHistory[0]);
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
