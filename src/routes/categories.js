const express = require('express');
const categories = new express.Router();
const auth = require('../middlewares/auth');

const controller = require('../controllers/categories');

categories.get('/', controller.listCategories);
categories.get('/:id', controller.getCategory);
categories.get('/name/:name', controller.getCategoryByName);
categories.post('/', auth.verifyAdmin, controller.addCategory);
categories.delete('/:id', auth.verifyAdmin, controller.deleteCategory);
categories.put('/:id', auth.verifyAdmin, controller.updateCategory);

module.exports = categories;
