const {
  dataValidator
} = require('../helpers/requestHandler');
const {
  returningError,
  returningSuccess
} = require('../helpers/responseHandler');
const historiesModel = require('../models/histories');
const usersModel = require('../models/users');

const requestReceiver = (data) => {
  const history = {
    user_id: null,
    vehicle_id: null,
    payment_code: null,
    payment: null,
    returned: null,
    prepayment: null
  };
  for (const el in data) {
    history[el] = data[el];
  }

  return history;
};

exports.getHistories = (req, res) => {
  const keys = [
    'id', 'user_id', 'vehicle_id', 'payment_code', 'payment', 'returned',
    'prepayment'
  ];

  historiesModel.getHistories(keys, (results) => {
    return res.status(200).json({
      success: true,
      message: 'Success getting histories',
      results
    });
  });
};

exports.addHistory = async (req, res) => {
  try {
    const data = requestReceiver(req.body);

    // validate inputed data
    const isValidate = dataValidator(data);

    if (!isValidate) {
      return res.status(400).json({
        success: true,
        message: 'Data not validate'
      });
    }

    // check if user exist
    const result = await usersModel.getUser(data.user_id);

    if (result.length < 1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // check if history has beed added
    const historyResult = await historiesModel.addHistory(data);

    if (historyResult.affectedRows < 1) {
      return res.status(400).json({
        success: false,
        message: "Can't make transaction"
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Transaction is created'
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteHistory = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    if (isNaN(Number(id))) {
      return returningError(res, 400, 'Id must be a number');
    }

    const history = await historiesModel.getHistory(id);

    console.log(history);

    if (history.length > 0) {
      const result = await historiesModel.deleteHistory(id);

      if (result.affectedRows < 1) {
        return returningError(res, 400, "Can't delete history");
      }

      return returningSuccess(res, 200, 'History has been deleted', history);
    }

    return returningError(res, 404, 'History not found');
  } catch (error) {
    console.log(error);
    return returningError(res, 500, 'Faile to delete history');
  }
};
