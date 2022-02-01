exports.dataValidator = (data) => {
  const dump = [];

  for (const el in data) {
    if (Object.prototype.hasOwnProperty.call(data, el)) {
      if (typeof data[el] === 'string') {
        dump.push(data[el].trim());
      } else {
        dump.push(data[el]);
      }
    }
  }

  return dump.every((el) => el);
};

exports.validateId = (id) => {
  if (isNaN(Number(id))) {
    return false;
  }
  return true;
};

exports.requestReceiver = (data, keys) => {
  const dump = {};
  for (const key of keys) {
    dump[key] = null;
  }

  for (const key in data) {
    if (keys.includes(key)) {
      dump[key] = data[key];
    }
  }

  return dump;
};
