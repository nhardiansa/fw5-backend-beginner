const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  mail
} = require('../config/mail');
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
const verificationCodesModel = require('../models/verificationCodes');

const {
  APP_EMAIL,
  SECRET_KEY,
  ENVIRONMENT
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

    // check if logged in user is the same user
    const loggedUser = req.headers.user;

    if (loggedUser.id !== id) {
      return returningError(res, 403, 'You are not authorized to update this user', data.image);
    }

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
      username: 'string|required',
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

    // check if username is new
    const isUsernameExist = await usersModel.findUserByData({
      username: data.username
    });

    if (isUsernameExist[0].rows > 0) {
      return returningError(res, 400, 'Username already used!');
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
      username,
      password
    } = req.body;

    const fieldName = email ? 'email' : 'username';

    if ((username !== undefined) && (email !== undefined)) {
      return returningError(res, 400, 'You can only use one of these fields: username or email');
    }

    // check if user is registered or not
    let user;
    if (email) {
      user = await usersModel.findUserByData({
        email
      }, true);
    } else {
      user = await usersModel.findUserByData({
        username
      }, true);
    }

    console.log(user);
    console.log(fieldName);

    // return returningError(res, 500, 'Not implemented yet!');

    if (user.length < 1) {
      return returningError(res, 403, `Password or ${fieldName} is incorrect`);
    }

    // check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, user[0].password);

    if (!isPasswordCorrect) {
      return returningError(res, 403, `Password or ${fieldName} is incorrect`);
    }

    const data = {
      id: user[0].id,
      confirmed: Number(user[0].confirmed),
      role: user[0].role
    };

    const token = jwt.sign(data, SECRET_KEY);

    return returningSuccess(res, 200, 'Success login', {
      token
    });
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to login an user');
  }
};

exports.sentConfirmationCode = async (req, res) => {
  try {
    const rules = {
      email: 'email|required'
    };

    console.log(req.body.verify);

    // if user want to confirm email
    if (req.body.verify !== undefined) {
      rules.verify = 'boolean|required';
    }

    const data = requestMapping(req.body, rules);

    // validate data
    const nullData = noNullData(data, rules);

    if (nullData) {
      return returningError(res, 400, nullData);
    }

    if (data.verify) {
      if (!Number(data.verify)) {
        return returningError(res, 400, "Don't send 'verify' if you not want to verify email");
      }
    }

    // check if email is registered
    const user = await usersModel.findEmail(data.email, true);

    if (user.length < 1) {
      return returningError(res, 400, 'Email is not registered');
    }

    // if email not confirmed
    if (!data.verify) {
      if (!Number(user[0].confirmed)) {
        return returningError(res, 400, 'Confirm your email first');
      }
    }

    if (Number(user[0].confirmed) && Number(data.verify)) {
      return returningError(res, 400, 'Email already confirmed');
    }

    // check if user has already requested a code
    const isResetRequested = await verificationCodesModel.getCodeByUserId(user[0].id);

    if (isResetRequested.length > 0) {
      const oldCode = new Date(isResetRequested[0].created_at);
      const now = new Date();
      const divider = ENVIRONMENT === 'development' ? 1000 : (60 * 1000);
      const diff = Math.round((now - oldCode) / divider);

      console.log(diff);

      if (diff < 5) {
        return returningError(res, 400, 'Wait 1 minute before requesting another code');
      }
      verificationCodesModel.deleteCode(isResetRequested[0].id);
    }

    // generate code
    const code = Math.abs(Math.floor(Math.random() * (999999 - 100000) + 100000));

    // insert verification code to database
    const results = await verificationCodesModel.insertRequest(user[0].id, code);

    const info = await mail.sendMail({
      from: APP_EMAIL,
      to: data.email,
      subject: 'Password Reset | Vehicle Rent',
      text: `${code}`,
      html: `<p>Your code for reset password is: ${code}</p>`
    });

    console.log(info);

    if (results.affectedRows > 0) {
      return returningSuccess(res, 200, 'Check your email for code', {
        user_id: user[0].id
      });
    }

    return returningError(res, 500, 'Failed to sent email confirmation');
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Unexpected error');
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const rules = {
      user_id: 'number|required',
      code: 'string|required',
      password: 'password|required',
      confirm_password: 'password|required'
    };

    const data = requestMapping(req.body, rules);

    const nullData = noNullData(data, rules);

    if (nullData) {
      return returningError(res, 400, nullData);
    }

    const user = await usersModel.getUser(data.user_id);

    console.log(user);

    // check if user is verified
    if (Number(user[0].confirmed) !== 1) {
      return returningError(res, 400, 'You need to confirm your email first');
    }

    // check if password must has at least 6 characters
    if (data.password.length < 6) {
      return returningError(res, 400, 'Password must be at least 6 characters');
    }

    // check if password and confirm password is same
    if (data.password !== data.confirm_password) {
      return returningError(res, 400, 'Password and confirm password is not same');
    }

    // check if code is valid
    const code = await verificationCodesModel.findCode(data.code, data.user_id);

    if (code.length < 1) {
      return returningError(res, 400, 'Code is not valid');
    }

    // check if code is expired
    if (code[0].is_expired === 1) {
      verificationCodesModel.deleteCode(code[0].id);
      return returningError(res, 400, 'Code is expired');
    }

    const resetCode = await verificationCodesModel.setExpiryCode(code[0].id);

    if (resetCode.affectedRows < 1) {
      return returningError(res, 500, 'Failed to reset password');
    }

    // generate hashed password
    const salt = bcrypt.genSaltSync(10);
    const hashePassword = bcrypt.hashSync(data.password, salt);

    // update password
    const results = await usersModel.updateUser(code[0].user_id, {
      password: hashePassword
    });

    if (results.affectedRows === 1) {
      return returningSuccess(res, 200, 'Success reset password');
    }

    return returningError(res, 500, 'Unexpected error occurred');
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Unexpected error');
  }
};

exports.emailVerifcation = async (req, res) => {
  try {
    const rules = {
      email: 'email|required',
      code: 'string|required'
    };

    const data = requestMapping(req.body, rules);

    const nullData = noNullData(data, rules);

    if (nullData) {
      return returningError(res, 400, nullData);
    }

    // check if email is registered and confirmed
    const user = await usersModel.findEmail(data.email, true);

    if (user.length < 1) {
      return returningError(res, 400, 'Email is not registered');
    }

    if (Number(user[0].confirmed)) {
      return returningError(res, 400, 'Email is already verified');
    }

    // check if code is valid
    const code = await verificationCodesModel.findCode(data.code, user[0].id);

    if (code.length < 1) {
      return returningError(res, 400, 'Code is not valid');
    }

    // check if code is expired
    const oldCode = new Date(code[0].created_at);
    const now = new Date();
    const divider = ENVIRONMENT === 'development' ? (60 * 1000) : (60 * 60 * 1000);

    const diff = Math.round((now - oldCode) / divider);

    // delete old code
    if (code[0].is_expired || diff > 1) {
      verificationCodesModel.deleteCode(code[0].id);
      return returningError(res, 400, 'Code is expired');
    }

    const setExpiryCode = await verificationCodesModel.setExpiryCode(code[0].id);

    if (setExpiryCode.affectedRows < 1) {
      return returningError(res, 500, 'Failed to verify email');
    }

    // update user status
    const updateUser = await usersModel.updateUser(user[0].id, {
      confirmed: 1
    });

    if (updateUser.affectedRows === 1) {
      return returningSuccess(res, 200, 'Success verify email');
    }

    return returningError(res, 500, 'Failed to verify email');
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Unexpected error');
  }
};
