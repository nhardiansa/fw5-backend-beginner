const express = require('express');
const route = new express.Router();

route.use('/vehicles', require('./vehicles'));

module.exports = route;
