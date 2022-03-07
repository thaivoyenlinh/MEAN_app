const logger = require("../config/logger");
const itemService = require("../services/item");
const apiResponse = require("../utilities/apiResponses");

exports.addItem = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Item controller");
      logger.info("addItem()");
      const files = req.files;
      const pathToImages = [];
      files.forEach((file) => {
        const path = `/images/items/${req.body.item_name}/${file.filename}`;
        pathToImages.push(path);
        logger.info(`path to file: ${pathToImages}`);
      });
      const obj = JSON.parse(JSON.stringify(req.body));
      const data = {
        item_name: obj.item_name,
        item_price: obj.item_price,
        item_category: obj.item_category,
        item_type: obj.item_type,
        item_discription: obj.item_discription,
        item_image: pathToImages,
      };
      await itemService.addItem(data);
      logger.info("addItem(): add the item successfully");
      const successMessageObj = {
        title: "SUCCESS",
        content: "You have successfully inserted the item",
      };
      return apiResponse.successResponse(res, successMessageObj);
    } catch (error) {
      logger.error(
        `addItem(): add the item failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "You have failed to insert the item",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};

exports.getItems = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Item controller");
      logger.info("getItems()");
      const listOfItems = await itemService.getItems();
      if (listOfItems && Array.isArray(listOfItems) && listOfItems.length > 0) {
        logger.info("getItems(): get all items sucessfully");
        const successMessageObj = {
          title: "SUCCESS",
          content: "Get successfully list of items",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          listOfItems
        );
      } else {
        const notFoundMessageObj = {
          title: "ERROR404",
          content: "No item found",
        };
        return apiResponse.notFoundResponse(res, notFoundMessageObj);
      }
    } catch (error) {
      logger.error(
        `getItems(): get list of items failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get list of items is failure",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 300);
};

exports.deleteItem = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Item controller");
      const itemID = req.params.id;
      logger.info(`deleteItem(), params: ${itemID}`);
      await itemService.deleteItem(itemID);
      logger.info(
        `deleteItem(): delete the item with ID ${itemID} sucessfully`
      );
      const successMessageObj = {
        title: "SUCCESS",
        content: "You have successfully deleted the item",
      };
      return apiResponse.successResponse(res, successMessageObj);
    } catch (error) {
      logger.error(
        `deleteItem(): deelete the item failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "You have failed to delete the item",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};

//Search item in admin page
exports.getItemsBySearchText = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Item controller");
      const text = req.params.search;
      logger.info(`getItemBySearchText(), searchText: ${text}`);
      const listOfItems = await itemService.getItemsBySearchText(text);
      logger.info(listOfItems);
      if (listOfItems && Array.isArray(listOfItems) && listOfItems.length > 0) {
        logger.info(
          "getItemBySearchText(): get items by search text sucessfully"
        );
        const successMessageObj = {
          title: "SUCCESS",
          content: "Get successfully items by search text",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          listOfItems
        );
      } else {
        const notFoundMessageObj = {
          title: "ERROR404",
          content: "No item found",
        };
        return apiResponse.notFoundResponse(res, notFoundMessageObj);
      }
    } catch (error) {
      logger.error(
        `getItemBySearchText(): get items by search text failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get items by search text is failure",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 200);
};

exports.getItemsByCategory = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Item controller");
      const categoryName = req.params.name;
      logger.info(`getItemsByCategory(), categoryName: ${categoryName}`);
      const listOfItems = await itemService.getItemsByCategory(categoryName);
      if (listOfItems && Array.isArray(listOfItems) && listOfItems.length > 0) {
        logger.info(
          "getItemsByCategory(): get items by category name sucessfully"
        );
        const successMessageObj = {
          title: "SUCCESS",
          content: "Get items by category name successfully",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          listOfItems
        );
      } else {
        const notFoundMessageObj = {
          title: "ERROR404",
          content: "No item found",
        };
        return apiResponse.notFoundResponse(res, notFoundMessageObj);
      }
    } catch (error) {
      logger.error(
        `getItemsByCategory(): get items by categogy name failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get items by categogy name is failure",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 200);
};

exports.getItemByID = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Item controller");
      const itemID = req.params.id;
      logger.info(`getItemByID(), ID: ${itemID}`);
      const item = await itemService.getItemByID(itemID);
      console.log(item);
      if (item) {
        logger.info(
          `getItemByID(): get the item with ID ${itemID} sucessfully`
        );
        const successMessageObj = {
          title: "SUCCESS",
          content: "Get successfully the item",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          item
        );
      } else {
        const notFoundMessageObj = {
          title: "ERROR404",
          content: "No item found",
        };
        return apiResponse.notFoundResponse(res, notFoundMessageObj);
      }
    } catch (error) {
      logger.error(
        `getItemByID(): get the item failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get the item is failure!",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 200);
};

//show data in home page (use in list-item component)
exports.getItemsBy = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Item controller");
      const filterKey = req.body.filter;
      const filterValue = req.body.filterValue;
      logger.info(
        `getItemsBy(), filterKey: ${filterKey}, filterValue: ${filterValue}`
      );
      const listOfItems = await itemService.getItemsBy(filterKey, filterValue);
      if (listOfItems && Array.isArray(listOfItems) && listOfItems.length > 0) {
        logger.info(
          `getItemsBy(): get items by ${filterKey}, value: ${filterValue} sucessfully`
        );
        const successMessageObj = {
          title: "SUCCESS",
          content: "get the items sucessfully",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          listOfItems
        );
      } else {
        const notFoundMessageObj = {
          title: "ERROR404",
          content: "No item found",
        };
        return apiResponse.notFoundResponse(res, notFoundMessageObj);
      }
    } catch (error) {
      logger.error(
        `getItemsBy(): get the items failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get the items is failure!",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 200);
};

exports.updateItem = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Item controller");
      const itemID = req.params.id;
      logger.info(`updateItem(), ID: ${itemID}`);
      const data = req.body;
      let newItemData = {
        item_name: data.item_name_replace,
        item_price: data.item_price_replace,
        item_category: data.item_category_replace,
        item_type: data.item_type_replace,
        item_discription: data.item_discription_replace,
      };
      await itemService.updateItem(itemID, newItemData);
      logger.info(
        `updateItem(): update the item with ID ${itemID}, new category data: ${newItemData} sucessfully`
      );
      const messageObj = {
        title: "SUCCESS",
        content: "You have successfully updated the item",
      };
      return apiResponse.successResponse(res, messageObj);
    } catch (error) {
      logger.error(
        `updateItem(): update the item failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Update the item is failure!",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};
