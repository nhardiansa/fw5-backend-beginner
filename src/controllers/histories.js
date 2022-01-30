const historiesModel = require('../models/histories');

module.exports = {
  getHistories: (req, res) => {
    const keys = [
      'id', 'user_id', 'vehicle_id', 'payment_code', 'payment', 'returned',
      'prepayment',
    ];

    historiesModel.getHistories(keys, (results) => {
      return res.status(200).json({
        success: true,
        message: `Success getting histories`,
        results,
      });
    });
  },
};
