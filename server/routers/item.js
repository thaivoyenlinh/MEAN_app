const express = require("express");
const router = express.Router();
const itemController = require("../controllers/ItemController");
const fileIUploadMiddleware = require("../middlewares/fileUpload");

//array have limit of file, any don't have limit
router.post(
  "/item",
  fileIUploadMiddleware.uploadItemImage.any("item_image"),
  itemController.addItem
);
router.post("/items", itemController.getItemsBy);
router.get("/items", itemController.getItems);
router.delete("/item/:id", itemController.deleteItem);
router.put("/item/:id", itemController.updateItem);
router.get("/items/list/:name", itemController.getItemsByCategory);
router.get("/item/:id", itemController.getItemByID);
router.get("/items/:search", itemController.getItemsBySearchText);

module.exports = router;
