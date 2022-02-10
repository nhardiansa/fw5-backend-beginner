exports.whereLikeCreator = (data) => {
  if (!(typeof data === 'object')) {
    return '';
  }

  if (Array.isArray(data)) {
    return '';
  }

  const keys = [];
  let str = Object.keys(data).length ? 'WHERE ' : '';

  if (data) {
    for (const key in data) {
      if (data[key]) {
        keys.push(key);
      }
    }

    keys.forEach((el, idx) => {
      if (data[el]) {
        if (idx < keys.length - 1) {
          str += `${el} LIKE '${data[el]}%' AND `;
        } else {
          str += `${el} LIKE '${data[el]}%'`;
        }
      }
    });
  }

  if (!(str.length > 6)) {
    str = '';
  }

  return str;
};

exports.whereLikeCreator = (data) => {
  let dataInArr = Object.keys(data);
  dataInArr = dataInArr.map((el) => {
    return `${el} = ?`;
  });
  return dataInArr.join(' && ');
};
