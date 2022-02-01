const {
  dataValidator,
  requestReceiver
} = require('../helpers/requestHandler');
const {
  returningError,
  returningSuccess
} = require('../helpers/responseHandler');
const historiesModel = require('../models/histories');
const usersModel = require('../models/users');

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

    // validate inputed id
    if (isNaN(Number(id))) {
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
        return returningError(res, 400, "Can't delete history");
      }

      // if history deleted
      return returningSuccess(res, 200, 'History has been deleted', history);
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
    if (isNaN(Number(id))) {
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
