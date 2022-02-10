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
    return returningError(res, 401, 'User not verified');
  }
};

exports.verifyAdmin = (req, res, next) => {
  const verifyUser = verify(req, res);

  if (!verifyUser) {
    return returningError(res, 401, 'Unauthorized');
  }

  if (verifyUser.role !== 'admin') {
    return returningError(res, 403, 'Just admin can do this');
  }

  next();
};

exports.verifyUser = (req, res, next) => {
  const verifyUser = verify(req, res);

  if (!verifyUser) {
    return returningError(res, 401, 'Unauthorized');
  }

  next();
};
