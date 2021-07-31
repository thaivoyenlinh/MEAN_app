const express = require('express');
const router = express.Router()
const CategoryController = require('../controllers/CategoryController');

//! First declare, client side use what method to send request to server side,
//! declare this method again in here

//* [POST] /store
router.post('/store', CategoryController.storeCategory);

//* [GET] /:slug
router.get('/:id', CategoryController.getCategory);

router.get('/', CategoryController.getListOfCategories);

//* [PUT] /:slug
router.put('/:id', CategoryController.updateCategory);

//* [DELETE] /:slug
router.delete('/:id', CategoryController.deleteCategory)

module.exports = router;