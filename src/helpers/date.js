const {
  TIMEZONE
} = process.env;

exports.dateNow = () => {
  let raw = new Date();

  raw = raw.toLocaleString('id-ID', {
    timeZone: TIMEZONE
  });

  raw = raw.replaceAll('/', '-').replaceAll('.', ':').split(' ');
  raw[0] = raw[0].split('-').map(el => el.length < 2 ? '0' + el : el).reverse().join('-');

  return raw.join(' ');
};
