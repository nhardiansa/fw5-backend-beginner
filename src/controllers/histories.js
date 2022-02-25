const {
  baseURL
} = require('../helpers/constant');
const {
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
const {
  dateValidator,
  noNullData,
  nullDataResponse
} = require('../helpers/validator');

const codeGenerator = (vehicleName) => {
  const vokal = ['a', 'i', 'u', 'e', 'o'];
  const num = Date.now().toString();

  const result = vehicleName.split(' ')[0]
    .split('')
    .filter(el => !vokal.includes(el))
    .join('');

  return result + num;
};

// exports.listHistories = async (req, res) => {
//   try {
//     const id = Number(req.query.user_id) || null;
//     const data = {
//       limit: Number(req.query.limit) || 5,
//       page: Number(req.query.page) || 1
//     };
//     const keys = [
//       'id', 'user_id', 'vehicle_id', 'payment_code', 'payment', 'returned',
//       'prepayment'
//     ];

//     if (!validateId(id) || id === null) {
//       return returningError(res, 400, 'user_id must be a number');
//     }

//     const results = await historiesModel.getHistories(keys, {
//       ...data,
//       id
//     });

//     const countHistories = await historiesModel.countHistories(id);
//     const countResult = countHistories[0].rows;

//     const pageInfo = pageInfoCreator(countResult, `${baseURL}/histories?`, {
//       ...data,
//       user_id: id
//     });

//     return returningSuccess(res, 200, 'Success getting histories', results, pageInfo);
//   } catch (error) {
//     console.error(error);
//     return returningError(res, 500, 'Failed to get list of history');
//   }
// };

exports.addHistory = async (req, res) => {
  try {
    const rules = {
      user_id: 'number|required', // from auth middleware
      vehicle_id: 'number|required',
      payment: 'boolean|required',
      returned: 'boolean|required',
      prepayment: 'number|required',
      qty: 'number|required',
      start_rent: 'date|required',
      end_rent: 'date|required'
    };

    // put user id from header into request body
    req.body.user_id = req.headers.user.id;

    const data = requestMapping(req.body, rules);

    // return returningError(res, 500, 'Not yet implemented');

    // validate inputed data
    for (const key in data) {
      if (!data[key]) {
        return returningError(res, 400, `Your ${key} must be ${rules[key].split('|')[0]}`);
      }
    }

    // Booking date validation
    const date1 = dateValidator(data.start_rent);
    const date2 = dateValidator(data.end_rent);

    if (!date1.status || !date2.status) {
      return returningError(res, 400, 'Booking date not valid');
    }

    const startRent = new Date(data.start_rent);
    const endRent = new Date(data.end_rent);
    const today = new Date();

    const checkNow = Math.ceil((startRent - today) / (1000 * 60 * 60 * 24));

    if (checkNow < 0) {
      return returningError(res, 400, 'Booking date must be today or greater than today');
    }

    const diffDays = Math.ceil((endRent - startRent) / (1000 * 60 * 60 * 24));

    if (diffDays < 1 || diffDays > 30) {
      return returningError(res, 400, 'Booking date must be between 1 - 30 days');
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

    // check qty of order
    if (Number(data.qty) < 1) {
      return returningError(res, 400, 'Qty must be greater than 0');
    }

    // check if vehicle is available to order
    const booked = vehicle[0].booked;
    const stocks = vehicle[0].qty;
    const available = stocks - booked;

    if (available < 1) {
      return returningError(res, 400, 'This vehicle is fully booked');
    }

    if (available < Number(data.qty)) {
      return returningError(res, 400, `Now, you can only book up to a maximum of ${available} vehicles`);
    }

    // check if vehicle is available to pre-payment
    if (Number(data.prepayment) > 0) {
      // check if user already pay
      if (Number(data.payment)) {
        return returningError(res, 400, 'You can not pay and prepay too');
      }

      if (Number(data.prepayment) >= vehicle[0].price) {
        return returningError(res, 400, 'Prepayment must be less than vehicle price');
      }

      if (Number(vehicle[0].prepayment) < 1) {
        return returningError(res, 400, 'This vehicle is not available for pre-payment');
      }

      if (Number(vehicle[0].prepayment) && Number(data.prepayment)) {
        const minPrice = Math.round(vehicle[0].price * (50 / 100));

        if (Number(data.prepayment) < minPrice) {
          return returningError(res, 400, `Pre-payment must be at least ${minPrice}`);
        }
      }
    }

    // check if user not pay
    if (!Number(data.payment) && !Number(data.prepayment)) {
      return returningError(res, 400, 'You must pay or prepay');
    }

    // return returningError(res, 500, 'Not yet implemented');

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

    // check if vehicle is returned
    if (!Number(history[0].returned)) {
      return returningError(res, 400, 'This vehicle is not returned yet');
    }

    // if history exist
    if (history.length > 0) {
      // delete history
      const result = await historiesModel.deleteHistoryUser(id);

      // if history can't to delete
      if (result.affectedRows < 1) {
        return returningError(res, 500, "Can't delete history");
      }

      const historyDeleted = await historiesModel.getHistory(id);

      // if history deleted
      return returningSuccess(res, 200, 'History has been deleted', historyDeleted[0]);
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

    const rules = {
      payment: 'boolean',
      returned: 'boolean',
      prepayment: 'number'
    };

    const data = requestMapping(req.body, rules);

    // check type of inputed data
    const checkData = noNullData(data, rules);

    if (checkData) {
      return returningError(res, 400, checkData);
    }

    // validate inputed id
    if (!validateId(id)) {
      return returningError(res, 400, 'Id must be a number');
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

exports.listHistories = async (req, res) => {
  try {
    const rules = {
      category_id: 'number',
      vehicle_name: 'string',
      start_rent: 'sorter',
      sort_date: 'sorter',
      sort_name: 'sorter',
      sort_returned: 'sorter',
      sort_payment: 'sorter',
      page: 'number',
      limit: 'number'
    };

    // get user id by token

    const data = requestMapping(req.query, rules);

    const {
      role,
      id
    } = req.headers.user;

    if (role === 'administrator') {
      data.admin = true;
    } else {
      data.user_id = id;
    }

    nullDataResponse(res, data, rules);

    if (data.category_id) {
      const category = await categoryModel.getCategory(data.category_id);

      if (category.length < 1) {
        return returningError(res, 404, 'Category not found');
      }
    }

    if (!data.page) {
      data.page = 1;
    }

    if (!data.limit) {
      data.limit = 5;
    }

    const histories = await historiesModel.getHistories(data);
    const historiesCount = await historiesModel.getHistoriesCount(data);

    const pageInfo = pageInfoCreator(historiesCount[0].rows, `${baseURL}/histories`, data);

    return returningSuccess(res, 200, 'Success getting histories', histories, pageInfo);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to get filtered histories');
  }
};

exports.deleteHistoryPermanent = async (req, res) => {
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

    // check if vehicle is returned
    if (!Number(history[0].returned)) {
      return returningError(res, 400, 'This vehicle is not returned yet');
    }

    // if history exist
    if (history.length > 0) {
      // delete history
      const result = await historiesModel.deleteHistoryUserPermanent(id);

      // if history can't to delete
      if (result.affectedRows < 1) {
        return returningError(res, 500, "Can't delete history");
      }

      const historyDeleted = await historiesModel.getHistory(id);

      // if history deleted
      return returningSuccess(res, 200, 'History has been deleted', historyDeleted[0]);
    }

    // if history not exist
    return returningError(res, 404, 'History not found');
  } catch (error) {
    // if error exist
    console.log(error);
    return returningError(res, 500, 'Failed to delete history');
  }
};
