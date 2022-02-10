const {
  validatorResult
} = require('./responseHandler');

exports.dateValidator = (date) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(date)) {
    return validatorResult(false, 'Date pattern not validate!');
  }

  const dateArr = date.split('-');

  const year = parseInt(dateArr[0], 10);
  const month = parseInt(dateArr[1], 10);
  const day = parseInt(dateArr[2], 10);

  if (year <= 1000 || year >= 3000) {
    return validatorResult(false, 'Year number is too big or too small!');
  }

  if (month < 1 || month > 12) {
    return validatorResult(false, 'Month number is too big or too small!');
  }

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 4 === 0) monthLength[1] = 29;

  if (day < 0 || day > monthLength[month - 1]) {
    return validatorResult(false, 'Days not matched with days in same month');
  }

  return validatorResult(true, 'Date validate!');
};

exports.noNullData = (res, data, rules) => {
  for (const key in data) {
    if (data[key] === null) {
      return `Your ${key} must be ${rules[key].split('|').shift()}`;
    }
  }

  return '';
};
