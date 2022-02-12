const {
  APP_URL
} = process.env;

module.exports = {
  usersTable: 'users',
  historiesTable: 'histories',
  vehiclesTable: 'vehicles',
  categoriesTable: 'categories',
  confirmationsTable: 'verification_codes',
  baseURL: APP_URL
};
