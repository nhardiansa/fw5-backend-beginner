const express = require('express');
const route = new express.Router();

route.use('/vehicles', require('./vehicles'));
route.use('/users', require('./users'));
route.use('/histories', require('./histories'));
route.use('/categories', require('./categories'));
route.use('/auth', require('./auth'));

module.exports = route;
