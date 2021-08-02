const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');


router.post('/store', ItemController.storeItem);
router.get('/', ItemController.getListOfItem);

module.exports = router;