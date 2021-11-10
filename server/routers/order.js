const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.post('/order', OrderController.storeOrder);
router.get('/order', OrderController.getLatestOrder);
router.delete('/order/:id', OrderController.deleteOrder);
router.get('/orders', OrderController.getListOfOrders);

module.exports = router;