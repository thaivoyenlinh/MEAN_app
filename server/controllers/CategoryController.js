const logger = require("../config/logger");
const categoryService = require("../services/category");
const apiResponse = require("../utilities/apiResponses");

exports.addCategory = async (req, res) => {
  try {
    logger.info("Category controller");
    logger.info("addCategory()");
    const pathToImage = `/images/categories/${req.file.filename}`;
    logger.info("Category file uploaded succesfully!");
    logger.info(`Filename: ${req.file.filename}`);
    const data = {
      category_name: req.body.category_name,
      category_image: pathToImage,
    };
    await categoryService.addCategory(data);
    logger.info("addCategory(): add the category sucessfully");
    const messageObj = {
      title: "SUCCESS",
      content: "You have successfully inserted the category",
    };
    return apiResponse.successResponse(res, messageObj);
  } catch (error) {
    logger.error(
      `addCategory(): add the category failure. Message: ${error.message}. Stack: ${error.stack}`
    );
    return apiResponse.errorResponse(
      res,
      "ERROR: Add the category is failure!!"
    );
  }
};

exports.getCategories = async (req, res) => {
  try {
    logger.info("Category controller");
    logger.info("getCategories()");
    const listOfCategories = await categoryService.getCategories();
    if (listOfCategories.length > 0) {
      logger.info("getCategories(): get all categories sucessfully");
      return apiResponse.successResponseWithData(
        res,
        "Get successfully list of categories",
        listOfCategories
      );
    } else {
      return apiResponse.notFoundResponse(res, "No category found");
    }
  } catch (error) {
    logger.error(
      `getCategories(): get list of categories failure. Message: ${error.message}. Stack: ${error.stack}`
    );
    return apiResponse.errorResponse(
      res,
      "ERROR: Get list of categories is failure!!"
    );
  }
};

exports.getCategory = async (req, res) => {
  try {
    logger.info("Category controller");
    const categoryID = req.params.id;
    logger.info(`getCategory(), params: ${categoryID}`);
    const category = await categoryService.getCategory(categoryID);
    if (category.length > 0) {
      logger.info(
        `getCategory(): get the category with ID ${categoryID} sucessfully`
      );
      return apiResponse.successResponseWithData(
        res,
        "Get successfully the category",
        category
      );
    } else {
      return apiResponse.notFoundResponse(res, "No category found");
    }
  } catch (error) {
    logger.error(
      `getCategory(): get the category failure. Message: ${error.message}. Stack: ${error.stack}`
    );
    return apiResponse.errorResponse(
      res,
      "ERROR: Get the categories is failure!!"
    );
  }
};

exports.updateCategory = async (req, res) => {};

exports.updateAllFieldCategory = async (req, res) => {};

exports.deleteCategory = async (req, res) => {};
