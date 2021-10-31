const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');
const { uploadItemImage } = require('../config/upload');

//array have limit of file, any don't have limit
router.post('/item', uploadItemImage.any('item_image'), ItemController.storeItem);
// router.get('/items/:search', ItemController.getItemsBySearch);
// router.get('/items/:name', ItemController.getItemByName);
router.get('/items', ItemController.getListOfItems);
router.delete('/item/:id', ItemController.deleteItem);
router.put('/item/:id', ItemController.updateItem);
router.get('/items/list/:name', ItemController.getItemsByCategory);
router.get('/item/:id', ItemController.getItemById);
router.post('/items', ItemController.getItemBy);

module.exports = router;