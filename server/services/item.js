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
    const result = await Item.find({});
    if (result) {
      logger.debug(JSON.stringify(result));
      result.forEach((item) => {
        for (let i = 0; i < item.item_image.length; i++) {
          item.item_image[i] = baseURL + item.item_image[i];
        }
      });
      return result;
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
    });
    if (result) {
      logger.debug(JSON.stringify(result));
      result.forEach((item) => {
        for (let i = 0; i < item.item_image.length; i++) {
          item.item_image[i] = baseURL + item.item_image[i];
        }
      });
      return result;
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
    const result = await Item.find({ item_category: categoryName });
    if (result) {
      logger.debug(JSON.stringify(result));
      result.forEach((item) => {
        for (let i = 0; i < item.item_image.length; i++) {
          item.item_image[i] = baseURL + item.item_image[i];
        }
      });
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
    const result = await Item.findOne({ _id: itemID });
    if (result) {
      logger.debug(JSON.stringify(result));
      for (let i = 0; i < result.item_image.length; i++) {
        result.item_image[i] = baseURL + result.item_image[i];
      }
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
    });
    if (result) {
      logger.debug(JSON.stringify(result));
      result.forEach((item) => {
        for (let i = 0; i < item.item_image.length; i++) {
          item.item_image[i] = baseURL + item.item_image[i];
        }
      });
      return result;
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
