const User = require("../models/user");
const logger = require("../config/logger");

const addUser = async (data) => {
  try {
    logger.info("User service");
    const user = new User(data);
    const result = await user.save();
    logger.debug(JSON.stringify(result));
  } catch (error) {
    logger.error(
      `addUser(): Error occurs while add new a user: Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const getUserProfile = async (userID) => {
  try {
    logger.info("User service");
    const result = await User.findOne({ _id: userID }).lean();
    if(result) {
      logger.debug(JSON.stringify(result));
      return result;
    } else return null;
  } catch (err) {
    logger.error(
      `getUserProfile(): Error occurs while get user profile with ID ${userID}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
}

const getUsers = async () => {
  try {
    logger.info("User service");
    const result = await User.find({});
    if (result) {
      logger.debug(JSON.stringify(result));
      return result;
    } else {
      return null;
    }
  } catch (error) {
    logger.error(
      `getUsers(): Error occurs while get all users. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const getLatestuser = async () => {
  try {
    logger.info("User service");
    const result = await User.findOne({}).sort({ _id: -1 });
    if (result) {
      logger.debug(JSON.stringify(result));
      return result;
    } else {
      return null;
    }
  } catch (error) {
    logger.error(
      `getLatestuser(): Error occurs while get latest user ${categoryID}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const getUser = async (userID) => {
  try {
    logger.info("User service");
    const result = await User.findOne({ _id: userID });
    if (result) {
      logger.debug(JSON.stringify(result));
      return result;
    } else {
      return null;
    }
  } catch (error) {
    logger.error(
      `getUser(): Error occurs while get user with ID ${userID}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const deleteUser = async (userID) => {
  try {
    logger.info("User service");
    const result = await User.remove({ _id: userID });
    logger.debug(JSON.stringify(result));
  } catch (error) {
    logger.error(
      `deleteUser(): Error occurs while delete the user with ID: ${userID}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

module.exports = {
  addUser,
  getUserProfile,
  getUsers,
  getLatestuser,
  getUser,
  deleteUser
};
