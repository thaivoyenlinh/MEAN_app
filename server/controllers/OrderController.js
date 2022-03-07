const logger = require("../config/logger");
const orderService = require("../services/order");
const apiResponse = require("../utilities/apiResponses");

exports.addOrder = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Order controller");
      logger.info("addOrder()");
      const value = req.body;
      const data = {
        user_id: value.userId,
        item_id: [value.itemId],
        quantity_item: ["1"],
        total_price: value.totalPrice,
      };
      await orderService.addOrder(data);
      logger.info("addOrder(): add the order successfully");
      const successMessageObj = {
        title: "SUCCESS",
        content: "You have ordered successfully",
      };
      return apiResponse.successResponse(res, successMessageObj);
    } catch (error) {
      logger.error(
        `addOrder(): add the order failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Your order failure",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};

exports.getOrders = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Order Controller");
      logger.info("getOrders()");
      const listOfOrders = await orderService.getOrders();
      if (
        listOfOrders &&
        Array.isArray(listOfOrders) &&
        listOfOrders.length > 0
      ) {
        logger.info("getOrders(): get all orders successfully");
        const successMessageObj = {
          title: "SUCCESS",
          content: "Get successfully list of orders",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          listOfOrders
        );
      } else {
        const notFoundMessageObj = {
          title: "ERROR404",
          content: "No order found",
        };
        return apiResponse.notFoundResponse(res, notFoundMessageObj);
      }
    } catch (error) {
      logger.error(
        `getOrders(): get list of orders failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get list of orders is failure!",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};

exports.getLatestOrder = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Order controller");
      logger.info("getLatestOrder()");
      const latestOrder = await orderService.getLatestOrder();
      if (latestOrder) {
        logger.info("getLatestOrder(): get the latest order successfully");
        const successMessageObj = {
          title: "SUCCESS",
          content: "Get successfully the latest order",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          latestOrder
        );
      } else {
        const notFoundMessageObj = {
          title: "ERROR404",
          content: "No latest order is found",
        };
        return apiResponse.notFoundResponse(res, notFoundMessageObj);
      }
    } catch (error) {
      logger.error(
        `getLatestOrder(): get the latest order failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get the lastest order is failre",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};

exports.deleteOrder = async (req, res) => {
  return setTimeout(async () => {
    try {
      logger.info("Order controller");
      const orderID = req.params.id;
      logger.info(`deleteOrder(), params: ${orderID}`);
      await orderService.deleteOrder(orderID);
      logger.info(
        `deleteOrder(): delete the order with ID: ${orderID} successfully`
      );
      const successMessageObj = {
        title: "SUCCESS",
        content: "You have successfully deleted the order",
      };
      return apiResponse.successResponse(res, successMessageObj);
    } catch (error) {
      logger.error(
        `deleteOrder(): delete the order failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "You have failed to delete the order",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};
