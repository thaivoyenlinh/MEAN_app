const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/ItemController");
const { uploadItemImage } = require("../middlewares/fileUpload");

//array have limit of file, any don't have limit
router.post(
  "/item",
  uploadItemImage.any("item_image"),
  ItemController.storeItem
);
router.post("/items", ItemController.getItemBy);
router.get("/items", ItemController.getListOfItems);
router.delete("/item/:id", ItemController.deleteItem);
router.put("/item/:id", ItemController.updateItem);
router.get("/items/list/:name", ItemController.getItemsByCategory);
router.get("/item/:id", ItemController.getItemById);
router.get("/items/:search", ItemController.getItemBySearch);

module.exports = router;
