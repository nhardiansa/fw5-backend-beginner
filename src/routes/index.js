const express = require('express');
const route = new express.Router();

route.use('/vehicles', require('./vehicles'));
route.use('/users', require('./users'));
route.use('/histories', require('./histories'));

module.exports = route;
