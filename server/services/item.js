const Item = require("../models/item");
const logger = require("../config/logger");
const baseURL = "http://localhost:4100";

const addItem = async (data) => {
  try {
    logger.info("Item service");
    const item = new Item(data);
    const result = await item.save();
    logger.debug(JSON.stringify(result));
  } catch (error) {
    logger.error(
      `addItem(): Error occurs while add new a item: Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const getItems = async () => {
  try {
    logger.info("Item service");
    //! trans mongoose obj (Schema) to plain obj in js
    //! 1: lean(): option enabled are plain javascript objects
    let result = await Item.find({}).lean();
    if (result) {
      logger.debug(JSON.stringify(result));
      //! trans mongoose obj (Schema) to plain obj in js
      //2: result = result.map(item => item.toObject());
      return result.map((item) => ({
        ...item,
        item_image: item.item_image.map((image) => baseURL + image),
      }));
    } else {
      return null;
    }
  } catch (error) {
    logger.error(
      `getItems(): Error occurs while get all items. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const deleteItem = async (itemID) => {
  try {
    logger.info("Item service");
    const result = await Item.remove({ _id: itemID });
    logger.debug(JSON.stringify(result));
  } catch (error) {
    logger.error(
      `deleteItem(): Error occurs while delete the item with ID: ${itemID}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const getItemsBySearchText = async (text) => {
  try {
    logger.info("Item service");
    const result = await Item.find({
      item_name: {
        // i: To match both lower case and upper case pattern in the string.
        $regex: text,
        $options: "i",
      },
    }).lean();
    if (result) {
      logger.debug(JSON.stringify(result));
      return result.map((item) => ({
        ...item,
        item_image: item.item_image.map((image) => baseURL + image),
      }));
    } else {
      return null;
    }
  } catch (error) {
    logger.error(
      `getItemsBySearchText(): Error occurs while get items by search text. Text: ${text}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const getItemsByCategory = async (categoryName) => {
  try {
    logger.info("Item service");
    const result = await Item.find({ item_category: categoryName }).lean();
    if (result) {
      logger.debug(JSON.stringify(result));
      result = result.map((item) => ({
        ...item,
        item_image: item.item_image.map((image) => baseURL + image),
      }));
      return result;
    } else {
      return null;
    }
  } catch (error) {
    logger.error(
      `getItemsByCategory(): Error occurs while get items by category name. Cateogry name: ${categoryName}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const getItemByID = async (itemID) => {
  try {
    logger.info("Item service");
    let result = await Item.findOne({ _id: itemID }).lean();
    if (result) {
      logger.debug(JSON.stringify(result));
      result["item_image"] = result.item_image.map((image) => baseURL + image);
      return result;
    } else {
      return null;
    }
  } catch (error) {
    logger.error(
      `getItemByID(): Error occurs while get item by ID. ID: ${itemID}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const getItemsBy = async (filterKey, filterValue) => {
  try {
    logger.info("Item service");
    const result = await Item.find({
      [filterKey]: { $regex: filterValue, $options: "i" },
    }).lean();
    if (result) {
      logger.debug(JSON.stringify(result));
      return result.map((item) => ({
        ...item,
        item_image: item.item_image.map((image) => baseURL + image),
      }));
    } else {
      return null;
    }
  } catch (error) {
    logger.error(
      `getItemBy(): Error occurs while get item by ${filterKey}. ${filterKey}: ${filterValue}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const updateItem = async (itemID, newItemData) => {
  try {
    logger.info("Item service");
    const result = await Item.updateOne({ _id: itemID }, newItemData);
    logger.debug(JSON.stringify(result));
  } catch (error) {
    logger.error(
      `updateItem(): Error occurs while update the item with ID: ${itemID}, data: ${newItemData}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

module.exports = {
  addItem,
  getItems,
  deleteItem,
  getItemsBySearchText,
  getItemsByCategory,
  getItemByID,
  getItemsBy,
  updateItem,
};
