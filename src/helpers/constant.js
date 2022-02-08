const {
  APP_URL
} = process.env;

module.exports = {
  usersTable: 'users',
  historiesTable: 'histories',
  vehiclesTable: 'vehicles',
  categoriesTable: 'categories',
  baseURL: APP_URL
};
