const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const usersModel = require('../models/users');
const otpCodesModel = require('../models/otpCodes');
const {
  returningError,
  returningSuccess
} = require('../helpers/responseHandler');
const {
  requestMapping
} = require('../helpers/requestHandler');
const {
  noNullData
} = require('../helpers/validator');
const {
  mail
} = require('../config/mail');

const {
  SECRET_KEY,
  ENVIRONMENT,
  APP_EMAIL
} = process.env;

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

    // return returningError(res, 500, 'Not implemented yet!');

    // check if user has registered or not
    if (user.length < 1) {
      return returningError(res, 403, `Password or ${fieldName} is incorrect`);
    }

    // check if user is verified or not
    if (!Number(user[0].confirmed)) {
      return returningError(res, 403, 'Your account is not verified yet, check your email to verify your account');
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
      id: data.id,
      token
    });
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to login an user');
  }
};

exports.registerUser = async (req, res) => {
  try {
    const rules = {
      name: 'string|required',
      email: 'email|required',
      username: 'string|required',
      phone: 'phone number|required',
      password: 'password|required'
    };

    const data = requestMapping(req.body, rules);

    // validate data
    const nullData = noNullData(data, rules);

    if (nullData) {
      return returningError(res, 400, nullData);
    }

    // check if password must has valid type
    const passwordRules = {
      minLength: 6,
      maxLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    };

    if (!validator.isStrongPassword(data.password, passwordRules)) {
      return returningError(res, 400, 'Password must be at least 6 characters long, maximum 12 characters long, must contain at least one lowercase letter, one uppercase letter, one number, and one special character');
    }

    // return returningError(res, 500, 'Not implemented yet!');

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

    // // send verification code
    if (results.affectedRows > 0) {
      const sendedCode = await sendCode(res, {
        email: data.email,
        userId: results.insertId
      });
      if (sendedCode) {
        return returningSuccess(res, 201, 'Check your email to verify your account');
      }
      return returningError(res, 500, 'Failed to send verification code');
    }

    return returningError(res, 500, 'Failed to register an user');
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Unexpected error');
  }
};

const resendCode = async (res, data) => {
  try {
    const {
      email,
      userId
    } = data;

    // check if email is registered
    const insertedEmail = await usersModel.findEmail(email);

    if (insertedEmail[0].rows < 1) {
      return returningError(res, 400, 'Email is not registered');
    }

    // check if user is verified
    const insertedUser = await usersModel.findUserByData({
      id: userId
    }, true);

    if (insertedUser[0].confirmed === 1) {
      return returningError(res, 400, 'Your account is already verified');
    }

    // send verification code
    const sendedCode = await sendCode(res, {
      email,
      userId
    });

    console.log(sendedCode);

    if (sendedCode) {
      return returningSuccess(res, 200, 'Verification code has been sent');
    }

    return returningError(res, 500, 'Failed to resend verification code');
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Failed to resend verification code');
  }
};

const sendCode = async (res, data, reset = false) => {
  const {
    email,
    userId
  } = data;
  // check if user has already requested a code
  const isResetRequested = await otpCodesModel.getCodeByUserId(userId);

  if (isResetRequested.length > 0) {
    const oldCode = new Date(isResetRequested[0].created_at);
    const now = new Date();
    const divider = ENVIRONMENT === 'development' ? 1000 : (60 * 1000);
    const diff = Math.round((now - oldCode) / divider);

    console.log(diff);

    if (diff < 5) {
      return returningError(res, 400, 'Wait 1 minute before requesting another code');
    }
    await otpCodesModel.deleteCode(isResetRequested[0].id);
  }

  // generate code
  const code = Math.abs(Math.floor(Math.random() * (999999 - 100000) + 100000));

  // insert verification code to database
  const results = await otpCodesModel.insertRequest(userId, code, reset);

  const info = await mail.sendMail({
    from: APP_EMAIL,
    to: email,
    subject: `${reset ? 'Password reset' : 'Verify Account'} | Vehicle Rent`,
    text: `${code}`,
    html: `<p>Your code for ${reset ? 'reset password' : 'verify account'} is: ${code}</p>`
  });

  console.log(info);

  if (results.affectedRows > 0) {
    return true;
  }
};

const verifyUser = async (res, data) => {
  try {
    const {
      code,
      userId
    } = data;

    // check if code is valid
    const insertedCode = await otpCodesModel.findCode(code, userId, 'verify');

    if (insertedCode.length < 1) {
      return returningError(res, 400, 'Code for verify account is not valid');
    }

    // set code as used
    const setExpiryCode = await otpCodesModel.setExpiryCode(insertedCode[0].id);

    if (setExpiryCode.affectedRows < 1) {
      return returningError(res, 500, 'Failed to verify email');
    }

    // update user status
    const updateUser = await usersModel.updateUser(userId, {
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

const resetPassword = async (res, data) => {
  try {
    const rules = {
      userId: 'number|required',
      code: 'string|required',
      password: 'string|required',
      confirmPassword: 'string|required'
    };

    const filteredData = requestMapping(data, rules);

    // validate data
    const nullData = noNullData(filteredData, rules);

    if (nullData) {
      return returningError(res, 400, nullData);
    }

    const {
      password,
      confirmPassword,
      userId,
      code
    } = filteredData;

    // check if code is valid
    const insertedCode = await otpCodesModel.findCode(code, userId, 'reset');

    if (insertedCode.length < 1) {
      return returningError(res, 400, 'Code for reset password is not valid');
    }

    // check if password must has at least 6 characters
    if (password.length < 6) {
      return returningError(res, 400, 'Password must be at least 6 characters');
    }

    // check if password and confirm password is same
    if (password !== confirmPassword) {
      return returningError(res, 400, 'Password and confirm password must be same');
    }

    // check if user is confirmed
    const user = await usersModel.findUserByData({
      id: userId
    }, true);

    if (!Number(user[0].confirmed)) {
      return returningError(res, 400, 'User is not confirmed');
    }

    // check if code is expired
    if (Number(insertedCode[0].is_expired)) {
      otpCodesModel.deleteCode(insertedCode[0].id);
      return returningError(res, 400, 'Code is expired');
    }

    const setExpirationCode = await otpCodesModel.setExpiryCode(insertedCode[0].id);

    if (setExpirationCode.affectedRows < 1) {
      return returningError(res, 500, 'Failed to reset password');
    }

    // generate new password
    const salt = bcrypt.genSaltSync(10);
    const hashePassword = bcrypt.hashSync(password, salt);

    // update new password
    const updateUser = await usersModel.updateUser(userId, {
      password: hashePassword
    });

    if (updateUser.affectedRows === 1) {
      return returningSuccess(res, 200, 'Success reset password');
    }

    return returningError(res, 500, 'Failed to reset password');
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Unexpected error');
  }
};

exports.confirmReset = async (req, res) => {
  try {
    const rules = {
      email: 'email',
      username: 'string',
      code: 'string',
      password: 'string',
      confirm_password: 'string'
    };

    const data = requestMapping(req.body, rules);

    // validate data
    const nullData = noNullData(data, rules);

    if (nullData) {
      return returningError(res, 400, nullData);
    }

    if (!data.email && !data.username) {
      return returningError(res, 400, 'Email or username is required');
    }

    if (data.username && data.email) {
      return returningError(res, 400, 'Please enter either email or username');
    }

    // check if user is registered
    let user;
    if (data.email) {
      user = await usersModel.findEmail(data.email, true);
    } else {
      user = await usersModel.findUserByData({
        username: data.username
      }, true);
    }

    if (user.length < 1) {
      return returningError(res, 400, 'User is not registered');
    }

    console.log(user);

    // reset password
    if (Number(user[0].confirmed) && data.code) {
      return resetPassword(res, {
        userId: String(user[0].id),
        code: data.code,
        password: data.password,
        confirmPassword: data.confirm_password
      });
    }

    // sent code to reset password
    if (Number(user[0].confirmed) && !data.code) {
      const codeSended = await sendCode(res, {
        email: user[0].email,
        userId: user[0].id
      }, true);

      if (codeSended) {
        return returningSuccess(res, 200, 'Check your email for reset password code');
      }
      return returningError(res, 500, 'Failed to send reset password code');
    }

    // verify user
    if (!Number(user[0].confirmed) && data.code) {
      return verifyUser(res, {
        code: data.code,
        userId: user[0].id
      });
    }

    // sent code to verify account
    if (!Number(user[0].confirmed) && !data.code) {
      return resendCode(res, {
        email: user[0].email,
        userId: user[0].id
      });
    }

    return returningError(res, 400, 'You must confirm your email before reset password');
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Unexpected error');
  }
};
