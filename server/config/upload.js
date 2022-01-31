const multer = require("multer");
const fs = require("fs-extra");

const categoryStorage = multer.diskStorage({
  destination: "./public/images/categories",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const itemStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `./public/images/items/${req.body.item_name}`;
    fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadCategoryImage = multer({ storage: categoryStorage });
const uploadItemImage = multer({ storage: itemStorage });
module.exports = { uploadCategoryImage, uploadItemImage };
