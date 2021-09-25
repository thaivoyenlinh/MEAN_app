const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const {uploadCategoryImage} = require('../config/upload');

//! First declare, client side use what method to send request to server side,
//! declare this method again in here

router.post('/category', uploadCategoryImage.single('category_image'), CategoryController.storeCategory);
router.get('/category/:id', CategoryController.getCategory);
router.get('/categories', CategoryController.getListOfCategories);
router.patch('/category/:id',  CategoryController.updateCategory);
router.put('/category/:id', uploadCategoryImage.single('category_image'), CategoryController.updateAllFieldCategory);
router.delete('/category/:id', CategoryController.deleteCategory);

module.exports = router;