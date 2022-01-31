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
