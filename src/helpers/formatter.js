
exports.dateFormat = (date) => {
  return date.split(/\D+/g).reverse().join('-');
};
