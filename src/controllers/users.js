const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  baseURL
} = require('../helpers/constant');
const {
  deleteFile
} = require('../helpers/fileHandler');
const {
  validateId,
  requestMapping
} = require('../helpers/requestHandler');
const {
  returningError,
  returningSuccess,
  pageInfoCreator,
  dataMapping
} = require('../helpers/responseHandler');

const {
  dateValidator,
  nullDataResponse,
  noNullData
} = require('../helpers/validator');
const usersModel = require('../models/users');

const {
  SECRET_KEY
} = process.env;

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
      return returningSuccess(res, 201, 'Success adding a user', dataMapping(user));
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
      const imagePath = user[0].image;

      if (imagePath) {
        deleteFile(imagePath);
      }

      const results = await usersModel.deleteUser(id);

      if (results.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: 'Success delete a user',
          results: dataMapping(user)[0]
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

    const rules = {
      name: 'string',
      email: 'email',
      phone: 'phone',
      gender: 'string',
      birthdate: 'date',
      address: 'string'
    };

    const data = requestMapping(req.body, rules);

    if (req.file) {
      data.image = req.file.path;
    }

    // return returningError(res, 500, 'Not implemented yet!', data.image);

    const findUser = await usersModel.getUser(id);

    if (findUser.length < 1) {
      return returningError(res, 404, 'User not found', data.image);
    }

    if (Object.keys(data).length < 1) {
      return returningError(res, 400, 'Data not validated', data.image);
    }

    if (data.gender) {
      const gender = ['female', 'male'];
      if (!gender.includes(data.gender)) {
        return returningError(res, 400, "Your gender isn't validate!", data.image);
      }
    }

    const nullDataMsg = noNullData(data, rules);

    if (nullDataMsg) {
      return returningError(res, 400, nullDataMsg, data.image);
    }

    // find duplicate email
    if (data.email) {
      const isEmailExist = await usersModel.findEmail(data.email);
      if (isEmailExist[0].rows > 0) {
        return returningError(res, 400, 'Email already registered', data.image);
      }
    }

    // find duplicate phone number
    if (data.phone) {
      const isPhoneExist = await usersModel.findPhone(data.phone);
      if (isPhoneExist[0].rows > 0) {
        return returningError(res, 400, 'Phone already registered', data.image);
      }
    }

    // if updated is image
    const oldData = await usersModel.getUser(id);

    if (data.image) {
      const oldImage = oldData[0].image;
      deleteFile(oldImage);
    }

    const results = await usersModel.updateUser(id, data);

    if (results.affectedRows > 0) {
      const user = await usersModel.getUser(id);
      return returningSuccess(res, 200, 'Success updating a user', dataMapping(user));
    }

    return returningError(res, 500, 'Failed to update an user', data.image);
  } catch (error) {
    const err = error.sqlMessage ? error.sqlMessage : 'Failed to update an user';
    const imagePath = req.file ? req.file.path : null;
    return returningError(res, 500, err, imagePath);
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

exports.registerUser = async (req, res) => {
  try {
    const rules = {
      name: 'string|required',
      email: 'email|required',
      phone: 'phone number|required',
      password: 'string|required'
    };

    const data = requestMapping(req.body, rules);

    // validate data
    nullDataResponse(res, data, rules);

    // check if password must has at least 6 characters
    if (data.password.length < 6) {
      return returningError(res, 400, 'Password must be at least 6 characters');
    }

    // check if email is new
    const isEmailExist = await usersModel.findEmail(data.email);

    if (isEmailExist[0].rows > 0) {
      return returningError(res, 400, 'Email already registered');
    }

    // check if phone is new
    const isPhoneExist = await usersModel.findPhone(data.phone);

    if (isPhoneExist[0].rows > 0) {
      return returningError(res, 400, 'Phone number already registered');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashePassword = bcrypt.hashSync(data.password, salt);

    data.password = hashePassword;

    const results = await usersModel.insertUser(data);

    if (results.affectedRows > 0) {
      const user = await usersModel.getUser(results.insertId);
      return returningSuccess(res, 201, 'Success registering a user', dataMapping(user)[0]);
    }

    return returningError(res, 500, 'Failed to register an user');
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to register an user');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    // check if email is registered
    const user = await usersModel.findEmail(email, true);

    if (user.length < 1) {
      return returningError(res, 403, 'Password or email is incorrect');
    }

    // check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, user[0].password);

    if (!isPasswordCorrect) {
      return returningError(res, 403, 'Password or email is incorrect');
    }

    const data = {
      id: user[0].id
    };

    if (user[0].email.includes('@vehicle.rent.mail.com')) {
      data.role = 'admin';
    }

    const token = jwt.sign(data, SECRET_KEY);

    return returningSuccess(res, 200, 'Success login', {
      token
    });
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to login an user');
  }
};
