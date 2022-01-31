const {
  dataValidator
} = require('../helpers/requestHandler');
const historiesModel = require('../models/histories');
const usersModel = require('../models/users');

module.exports = {
  getHistories: (req, res) => {
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
  },

  addHistory: async (req, res) => {
    try {
      const data = {
        user_id: req.body.user_id,
        vehicle_id: req.body.vehicle_id,
        payment_code: req.body.payment_code,
        payment: req.body.payment,
        returned: req.body.returned,
        prepayment: req.body.prepayment
      };

      const isValidate = dataValidator(data);

      if (!isValidate) {
        return res.status(400).json({
          success: true,
          message: 'Data not validate'
        });
      }

      const result = await usersModel.getUser(data.user_id);

      if (result.length < 1) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const historyResult = await historiesModel.addHistory(data);

      if (historyResult.affectedRows < 1) {
        return res.status(400).json({
          success: false,
          message: 'Can\'t make transaction'
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Transaction is created'
      });
    } catch (error) {
      console.log(error);
    }
  }
};
