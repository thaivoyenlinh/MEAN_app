const express = require('express');
const router = express.Router()

const CategoryController = require('../controllers/CategoryController');

router.get('/', CategoryController.getListOfCategories);

//* [POST] /store
router.post('/store', CategoryController.storeCategory);

module.exports = router;