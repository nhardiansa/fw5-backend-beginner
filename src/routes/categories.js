const express = require('express');
const categories = new express.Router();

const controller = require('../controllers/categories');

categories.get('/', controller.listCategories);
categories.get('/:id', controller.getCategory);
categories.post('/', controller.addCategory);
categories.delete('/:id', controller.deleteCategory);
categories.put('/:id', controller.updateCategory);

module.exports = categories;
