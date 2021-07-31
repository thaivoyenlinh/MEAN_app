const express = require('express');
const router = express.Router()
const CategoryController = require('../controllers/CategoryController');

//! First declare, client side use what method to send request to server side,
//! declare this method again in here

router.get('/', CategoryController.getListOfCategories);

//* [POST] /store
router.post('/store', CategoryController.storeCategory);

//* [DELETE] /:slug
router.delete('/:id', CategoryController.deleteCategory)

module.exports = router;