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

const {
  dateValidator
} = require('../helpers/validator');
const usersModel = require('../models/users');

exports.getUser = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    if (!validateId(id)) {
      return returningError(res, 400, 'Id must be a number');
    }

    const user = await usersModel.getUser(id);

    if (user.length < 1) {
      return returningError(res, 404, 'User not found');
    }

    console.log(user);

    return returningSuccess(res, 200, 'Success getting a user', user[0]);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to get user');
  }
};

exports.addUser = async (req, res) => {
  try {
    const data = requestMapping(req.body, {
      name: 'string',
      email: 'email',
      phone: 'phone',
      gender: 'string',
      birthdate: 'date',
      address: 'string'
    });

    if (req.file) {
      data.image = req.file.path;
    }

    // return returningError(res, 500, 'Not implemented yet!');

    if (Object.keys(data).length < 1) {
      return returningError(res, 400, 'Data incomplete');
    }

    // gender validation
    const gender = ['female', 'male'];

    if (!gender.includes(data.gender)) {
      return returningError(res, 400, "Your gender isn't validate!");
    }

    // birthdate validation
    const dateValidation = dateValidator(data.birthdate);

    if (!dateValidation.status) {
      return returningError(res, 400, dateValidation.message);
    }

    // return returningError(res, 500, 'Not implented yet!');

    for (const key in data) {
      if (data[key] === null) {
        return returningError(res, 400, `Your ${key} isn't validate!`);
      }
    }

    const isEmailExist = await usersModel.findEmail(data.email);
    const isPhoneExist = await usersModel.findPhone(data.phone);

    if (isEmailExist[0].rows > 0) {
      return returningError(res, 400, 'Email already registered');
    }

    if (isPhoneExist[0].rows > 0) {
      return returningError(res, 400, 'Phone already registered');
    }

    const results = await usersModel.insertUser(data);

    if (results.affectedRows > 0) {
      const user = await usersModel.getUser(results.insertId);
      user[0].image = `${baseURL}/${user[0].image}`;
      return returningSuccess(res, 201, 'Success adding a user', user[0]);
    }
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to add an user');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    if (!validateId(id)) {
      return returningError(res, 400, 'Id must be a number');
    }

    const user = await usersModel.getUser(id);

    if (user.length > 0) {
      const results = await usersModel.deleteUser(id);

      if (results.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: 'Success delete a user',
          results: user[0]
        });
      } else {
        throw new Error('Failed to delete data');
      }
    }

    return res.status(404).json({
      success: false,
      message: `User with id ${id} not found`
    });
  } catch (error) {
    const err = error.sqlMessage ? error.sqlMessage : 'Failed to delete user';
    return returningError(res, 500, err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const data = requestMapping(req.body, {
      name: 'string',
      email: 'email',
      phone: 'phone',
      gender: 'string',
      birthdate: 'date',
      address: 'string'
    });

    if (Object.keys(data).length < 1) {
      return returningError(res, 400, 'Data not validated');
    }

    if (data.gender) {
      const gender = ['female', 'male'];
      if (!gender.includes(data.gender)) {
        return returningError(res, 400, "Your gender isn't validate!");
      }
    }

    for (const key in data) {
      if (data[key] === null) {
        return returningError(res, 400, `Your ${key} isn't validate!`);
      }
    }

    if (data.email) {
      const isEmailExist = await usersModel.findEmail(data.email);
      if (isEmailExist[0].rows > 0) {
        return returningError(res, 400, 'Email already registered');
      }
    }

    if (data.phone) {
      const isPhoneExist = await usersModel.findPhone(data.phone);
      if (isPhoneExist[0].rows > 0) {
        return returningError(res, 400, 'Phone already registered');
      }
    }

    const results = await usersModel.updateUser(id, data);

    if (results.affectedRows > 0) {
      const user = await usersModel.getUser(id);
      return returningSuccess(res, 200, 'Success updating a user', user[0]);
    }

    return returningError(res, 500, 'Failed to delete an user');
  } catch (error) {
    const err = error.sqlMessage ? error.sqlMessage : 'Failed to delete user';
    return returningError(res, 500, err);
  }
};

exports.listUsers = async (req, res) => {
  try {
    const data = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 5,
      name: req.query.name || '',
      email: req.query.email || ''
    };

    const results = await usersModel.getUsers(data);
    const totalUsers = await usersModel.countUsers({
      name: data.name,
      email: data.email
    });

    const countResult = totalUsers[0].rows;
    const pageInfo = pageInfoCreator(countResult, `${baseURL}/users?`, data);

    return returningSuccess(res, 200, 'Success getting all users', results, pageInfo);
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to get list of users');
  }
};
