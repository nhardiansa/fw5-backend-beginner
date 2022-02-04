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

// memeriksa setiap data (obj) berdasarkan rules (obj)
// apabila ada data yang tidak sesuai rules dari keys maka fungsi akan langsung mengembalikan false
// apabila semua data sesuai rules dari keys maka fungsi akan langsung mengembalikan objek yang telah di-validasi
exports.requestMapping = (data, rules) => {
  const dump = {};
  const keysCollection = [];

  for (const k in data) {
    keysCollection.push(k);
  }

  for (const k in data) {
    if (keysCollection.includes(k)) {
      if (rules[k] === 'string') {
        dump[k] = data[k].trim();
      }
      if (rules[k] === 'number') {
        if (isNaN(Number(data[k]))) {
          dump[k] = null;
        } else {
          dump[k] = data[k];
        }
      }
      if (rules[k] === 'boolean') {
        data[k] = String(data[k]);
        if (data[k] === 'true' || data[k] === '1') {
          dump[k] = '1';
        } else if (data[k] === 'false' || data[k] === '0') {
          dump[k] = '0';
        } else {
          dump[k] = null;
        }
      }
      if (rules[k] === 'date') {
        const regexPattern = /^\d{4}-\d{2}-\d{2}$/;
        if (regexPattern.test(data[k])) {
          dump[k] = data[k];
        } else {
          dump[k] = null;
        }
      }
      if (rules[k] === 'phone') {
        const regexPattern = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g;
        if (regexPattern.test(data[k])) {
          dump[k] = data[k];
        } else {
          dump[k] = null;
        }
      }
      if (rules[k] === 'email') {
        // eslint-disable-next-line no-useless-escape
        const regexPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regexPattern.test(data[k])) {
          dump[k] = data[k];
        } else {
          dump[k] = null;
        }
      }
    }
  }

  // for (const key in dump) {
  //   if (dump[key] === null) {
  //     return false;
  //   }
  // }

  return dump;
};
