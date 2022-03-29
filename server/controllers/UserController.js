const logger = require("../config/logger");
const userService = require("../services/user");
const apiResponse = require("../utilities/apiResponses");
const passport = require("passport");

exports.register = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("User controller");
      logger.info("addUser()");
      const value = req.body;
      console.log(value.password);
      const data = {
        user_name: value.username,
        user_phoneNumber: value.phoneNumber,
        user_password: value.password,
      };
      await userService.addUser(data);
      logger.info("addUser(): add the user successfully");
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

exports.login = (req, res, next) => {
  console.log("authenticate controller:");
  passport.authenticate("local", (err, user, info) => {
    //error from passport midleware
    if (err) {
      return res.status(400).json(err);
    }
    //registered user
    else if (user) {
      // console.log(user);
      return res.status(200).json({ token: user.generateJWT() });
    }
    //unknown user or wrong password
    else {
      return res.status(404).json(info);
    }
  })(req, res);
};

exports.userProfile = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("User controller");
      logger.info("userProfile()");
      const user = await userService.getUserProfile(req._id);
      if (user) {
        //delete multi attribute from object in nodejs
        //! need to trans from mongoose obj (Schema) to plain obj in js "lean()"
        const { user_password, saltSecret, createdAt, updatedAt, ...userData } = user;
        logger.info(`getUserProfile(): get the user profile with ID sucessfully`);
        const successMessageObj = {
          title: "SUCCESS",
          content: "Get successfully the user profile by ID",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          userData
        );
      } else {
        const notFoundMessageObj = {
          title: "ERROR404",
          content: "No user found",
        };
        return apiResponse.notFoundResponse(res, notFoundMessageObj);
      }
    } catch (err) {
      logger.error(
        `getUserProfile(): get the user profile failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get the user profile by ID is failure!",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 200);
}

exports.getUsers = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("User controller");
      logger.info("getUsers()");
      const listOfUsers = await userService.getUsers();
      if (listOfUsers && Array.isArray(listOfUsers) && listOfUsers.length > 0) {
        logger.info("getUsers(): get all users successfully");
        const successMessageObj = {
          title: "SUCCESS",
          content: "Get successfully list of users",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          listOfUsers
        );
      } else {
        const notFoundMessageObj = {
          title: "ERROR404",
          content: "No user found",
        };
        return apiResponse.notFoundResponse(res, notFoundMessageObj);
      }
    } catch (error) {
      logger.error(
        `getOrders(): get list of users failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get list of users is failure!",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
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
        const successMessageObj = {
          title: "SUCCESS",
          content: "Get successfully the latest user",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          latestUser
        );
      } else {
        const notFoundMessageObj = {
          title: "ERROR404",
          content: "No latest user found",
        };
        return apiResponse.notFoundResponse(res, notFoundMessageObj);
      }
    } catch (error) {
      logger.error(
        `getLatestUser(): get the latest user failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get the lastest order is failre!",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
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
        const successMessageObj = {
          title: "SUCCESS",
          content: "Get successfully the user by ID",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          user
        );
      } else {
        const notFoundMessageObj = {
          title: "ERROR404",
          content: "No user found",
        };
        return apiResponse.notFoundResponse(res, notFoundMessageObj);
      }
    } catch (error) {
      logger.error(
        `getUser(): get the user failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get the user by ID is failure!",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
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
}
