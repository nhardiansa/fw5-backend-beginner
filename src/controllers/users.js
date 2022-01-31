const {
  dataValidator
} = require('../helpers/requestHandler');
const usersModel = require('../models/users');

// as receiver just for user controller
const requestReceiver = (data) => {
  const user = {
    name: '',
    email: '',
    gender: '',
    address: '',
    birthdate: '',
    phone: ''

  };
  for (const el in data) {
    user[el] = data[el];
  }

  return user;
};

exports.getUser = (req, res) => {
  const {
    id
  } = req.params;

  usersModel.getUser(id, (result) => {
    if (result.length < 1) {
      return res.status(404).json({
        success: false,
        message: `User with id ${id} not found`
      });
    }
    return res.status(200).json({
      success: true,
      message: `Success getting user with id ${id}`,
      result: result[0]
    });
  });
};

exports.addUser = async (req, res) => {
  try {
    const data = requestReceiver(req.body);

    if (!dataValidator(data)) {
      return res.json({
        success: false,
        message: "Your data isn't validate!"
      });
    }

    const results = await usersModel.insertUser(data);
    const user = await usersModel.getUser(results.insertId);

    if (results.affectedRows > 0) {
      return res.json({
        success: false,
        message: 'Success insert new user',
        results: user[0]
      });
    }
  } catch (error) {
    console.log(error.sqlMessage);
    return res.json({
      success: false,
      message: error.sqlMessage
    });
  }
};
