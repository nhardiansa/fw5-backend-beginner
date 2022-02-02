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
      results: data,
      pageInfo
    });
  }

  return res.status(status).json({
    success: true,
    message: message,
    results: data
  });
};

exports.pageInfoCreator = (totalDataCount, url, values) => {
  const {
    page,
    limit
  } = values;

  const keys = [];
  let next = url;
  let prev = url;

  for (const key in values) {
    keys.push(key);
  }

  keys.forEach((el, idx) => {
    if (values[el]) {
      if (el === 'page') {
        next += el + '=' + (values[el] + 1) + '&';
        prev += el + '=' + (values[el] - 1) + '&';
      } else if (idx < (keys.length - 1)) {
        next += el + '=' + values[el] + '&';
        prev += el + '=' + values[el] + '&';
      } else {
        next += el + '=' + values[el];
        prev += el + '=' + values[el];
      }
    }
  });

  const totalData = totalDataCount;

  const totalPages = Math.ceil(totalData[0].rows / limit) || 1;

  return ({
    totalPages,
    currentPage: page,
    nextPage: page < totalPages ? next : null,
    prevPage: page > 1 ? prev : null,
    lastPages: totalPages
  });
};
