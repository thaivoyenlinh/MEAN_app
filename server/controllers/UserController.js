const logger = require("../config/logger");
const userService = require("../services/user");
const apiResponse = require("../utilities/apiResponses");

exports.addUser = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("User controller");
      logger.info("addUser()");
      const value = req.body;
      const data = {
        user_name: value.name,
        user_phoneNumber: value.phoneNumber,
        user_address: value.address,
      };
      await userService.addUser(data);
      logger.info("addOrder(): add the order successfully");
      const successMessageObj = {
        title: "SUCCESS",
        content: "You have successfully inserted the user",
      };
      return apiResponse.successResponse(res, successMessageObj);
    } catch (error) {
      logger.error(
        `addUser(): add the user failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "You have failed to insert the user",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 200);
};

exports.getUsers = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("User controller");
      logger.info("getUsers()");
      const listOfUsers = await userService.getUsers();
      if (listOfUsers && Array.isArray(listOfUsers) && listOfUsers.length > 0) {
        logger.info("getUsers(): get all users successfully");
        return apiResponse.successResponseWithData(
          res,
          "Get successfully list of users",
          listOfUsers
        );
      } else {
        return apiResponse.notFoundResponse(res, "No user found");
      }
    } catch (error) {
      logger.error(
        `getOrders(): get list of users failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      return apiResponse.errorResponse(
        res,
        "ERROR: Get list of users is failure!!"
      );
    }
  }, 500);
};

exports.getLatestUser = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("User controller");
      logger.info("getLatestUser()");
      const latestUser = await userService.getLatestuser();
      if (latestUser) {
        logger.info("getLatestUser(): get the latest order successfully");
        return apiResponse.successResponseWithData(
          res,
          "Get successfully the latest user",
          latestUser
        );
      } else {
        return apiResponse.notFoundResponse(res, "No latest user found");
      }
    } catch (error) {
      logger.error(
        `getLatestUser(): get the latest user failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      return apiResponse.errorResponse(
        res,
        "ERROR: get the lastest order is failre"
      );
    }
  }, 400);
};

exports.getUser = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("User controller");
      const userID = req.params.id;
      logger.info(`getUser(), params: ${userID}`);
      const user = await userService.getUser(userID);
      if (user) {
        logger.info(`getUser(): get the user with ID ${userID} sucessfully`);
        return apiResponse.successResponseWithData(
          res,
          "Get successfully the user by ID",
          user
        );
      } else {
        return apiResponse.notFoundResponse(res, "No user found");
      }
    } catch (error) {
      logger.error(
        `getUser(): get the user failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      return apiResponse.errorResponse(
        res,
        "ERROR: get the user by ID is failure"
      );
    }
  }, 200);
};

exports.deleteUser = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("User controller");
      const userID = req.params.id;
      logger.info(`deleteUser(), params: ${userID}`);
      await userService.deleteUser(userID);
      logger.info(
        `deleteUser(): delete the user with ID: ${userID} successfully`
      );
      const successMessageObj = {
        title: "SUCCESS",
        content: "You have successfully deleted the user",
      };
      return apiResponse.successResponse(res, successMessageObj);
    } catch (error) {
      logger.error(
        `deleteUser(): delete the user failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "You have failed to delete the user",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 400);
};
