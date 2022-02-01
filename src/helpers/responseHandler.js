exports.returningError = (res, status, message) => {
  return res.status(status).json({
    success: false,
    message
  });
};

exports.returningSuccess = (res, status, message, data) => {
  return res.status(status).json({
    success: true,
    message: message,
    result: data
  });
};
