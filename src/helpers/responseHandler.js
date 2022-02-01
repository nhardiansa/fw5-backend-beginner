exports.returningError = (res, status, message) => {
  return res.status(status).json({
    success: false,
    message
  });
};

exports.returningSuccess = (res, status, message, data, pageInfo = null) => {
  if (pageInfo) {
    return res.status(status).json({
      success: true,
      message: message,
      result: data,
      pageInfo
    });
  }

  return res.status(status).json({
    success: true,
    message: message,
    result: data
  });
};
