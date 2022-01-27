exports.dataValidator = (data) => {
  const dump = [];

  for (const el in data) {
    dump.push(data[el]);
  }

  return dump.every(el => el);
};
