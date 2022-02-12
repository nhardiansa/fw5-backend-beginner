const {
  APP_URL
} = process.env;

module.exports = {
  usersTable: 'users',
  historiesTable: 'histories',
  vehiclesTable: 'vehicles',
  categoriesTable: 'categories',
  confirmationsTable: 'forgot_passwords',
  baseURL: APP_URL
};
