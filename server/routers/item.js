const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');


router.post('/store', ItemController.storeItem);
router.get('/:id', ItemController.getItem);
router.get('/search/:name', ItemController.getItemByName);
router.get('/', ItemController.getListOfItems);
router.delete('/:id', ItemController.deleteItem);
router.put('/:id', ItemController.updateItem);

module.exports = router;