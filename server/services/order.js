const Order = require("../models/order");
const logger = require("../config/logger");
const order = require("../models/order");
const baseURL = "http://localhost:4100";

const addOrder = async (data) => {
  try {
    logger.info("Order service");
    const order = new Order(data);
    const result = await order.save();
    logger.debug(JSON.stringify(result));
  } catch (error) {
    logger.error(
      `addOrder(): Error occurs while add new a order: Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const getOrders = async () => {
  try {
    logger.info("Order service");
    const result = await Order.find({});
    if (result) {
      logger.debug(JSON.stringify(result));
      return result;
    } else {
      return null;
    }
  } catch (error) {
    looger.error(
      `getOrders(): Error occurs while get all orders. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const getLatestOrder = async (orderID) => {
  try {
    logger.info("Order service");
    const result = await Order.findOne({}).sort({ _id: -1 });
    if (result) {
      logger.debug(JSON.stringify(result));
      return result;
    } else {
      return null;
    }
  } catch (error) {
    logger.error(
      `getLastestOrder(): Error occurs while get latest order ${categoryID}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const deleteOrder = async (orderID) => {
  try {
    logger.info("Order service");
    const result = await Order.remove({ _id: orderID });
    logger.debug(JSON.stringify(result));
  } catch (error) {
    logger.error(
      `deleteOrder(): Error occurs while delete the order with ID: ${orderID}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

module.exports = {
  addOrder,
  getOrders,
  getLatestOrder,
  deleteOrder,
};
