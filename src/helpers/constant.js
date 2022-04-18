const {
  APP_URL
} = process.env;

module.exports = {
  usersTable: 'users',
  historiesTable: 'histories',
  vehiclesTable: 'vehicles',
  categoriesTable: 'categories',
  otpCodes: 'otp_codes',
  rolesTable: 'roles',
  baseURL: APP_URL
};
