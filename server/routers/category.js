const express = require('express');
const router = express.Router()

const CategoryController = require('../controllers/CategoryController');

router.get('/', CategoryController.getListOfCategories);

module.exports = router;