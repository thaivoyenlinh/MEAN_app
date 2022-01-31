const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
const fileUploadMiddleware = require("../middlewares/fileUpload");

//! First declare, client side use what method to send request to server side,
//! declare this method again in here

router.post(
  "/category",
  fileUploadMiddleware.uploadCategoryImage.single("category_image"),
  categoryController.addCategory
);
router.get("/category/:id", categoryController.getCategory);
router.get("/categories", categoryController.getCategories);
router.patch("/category/:id", categoryController.updateCategory);
router.put(
  "/category/:id",
  fileUploadMiddleware.uploadCategoryImage.single("category_image"),
  categoryController.updateAllFieldCategory
);
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;
