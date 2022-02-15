const jwt = require('jsonwebtoken');

const {
  returningError
} = require('../helpers/responseHandler');
const {
  SECRET_KEY
} = process.env;

const verify = (req, res) => {
  try {
    const authHead = req.headers.authorization;

    if (!authHead) {
      return false;
    }

    if (!authHead.startsWith('Bearer')) {
      return false;
    }

    const token = authHead.split(' ').pop();

    const decoded = jwt.verify(token, SECRET_KEY);

    if (!decoded) {
      return false;
    }

    return decoded;
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Unexpected error');
  }
};

exports.verifyAdmin = (req, res, next) => {
  try {
    const verifyUser = verify(req, res);

    if (!verifyUser) {
      return returningError(res, 401, 'Unauthorized');
    }

    if (verifyUser.role !== 'administrator') {
      return returningError(res, 403, 'Just admin can do this');
    }

    next();
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Unexpected error');
  }
};

exports.verifyUser = (req, res, next) => {
  try {
    const verifyUser = verify(req, res);

    // check if user is confirmed
    if (!verifyUser.confirmed) {
      return returningError(res, 403, 'User not confirmed');
    }

    if (!verifyUser) {
      return returningError(res, 401, 'Unauthorized');
    }

    // put user data to headers object
    req.headers.user = {
      id: String(verifyUser.id),
      role: verifyUser.role
    };

    next();
  } catch (error) {
    console.error(error);
    return returningError(res, 500, 'Unexpected error');
  }
};
