const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.post("/order", orderController.addOrder);
router.get("/orders", orderController.getOrders);
router.get("/order", orderController.getLatestOrder);
router.delete("/order/:id", orderController.deleteOrder);

module.exports = router;
