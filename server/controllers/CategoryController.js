const logger = require("../config/logger");
const categoryService = require("../services/category");
const apiResponse = require("../utilities/apiResponses");

exports.addCategory = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Category controller");
      logger.info("addCategory()");
      const pathToImage = `/images/categories/${req.file.filename}`;
      logger.info("Category file uploaded succesfully!");
      logger.info(`Path to file: ${pathToImage}`);
      const data = {
        category_name: req.body.category_name,
        category_image: pathToImage,
      };
      await categoryService.addCategory(data);
      logger.info("addCategory(): add the category sucessfully");
      const successMessageObj = {
        title: "SUCCESS",
        content: "You have successfully inserted the category",
      };
      return apiResponse.successResponse(res, successMessageObj);
    } catch (error) {
      logger.error(
        `addCategory(): add the category failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "You have failed to insert the category",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};

exports.getCategories = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Category controller");
      logger.info("getCategories()");
      const listOfCategories = await categoryService.getCategories();
      if (
        listOfCategories &&
        Array.isArray(listOfCategories) &&
        listOfCategories.length > 0
      ) {
        logger.info("getCategories(): get all categories sucessfully");
        const successMessageObj = {
          title: "SUCCESS",
          content: "Get successfully list of categories",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          listOfCategories
        );
      } else {
        const notFoundMessageObj = {
          title: "ERROR404",
          content: "No category found",
        };
        return apiResponse.notFoundResponse(res, notFoundMessageObj);
      }
    } catch (error) {
      logger.error(
        `getCategories(): get list of categories failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get list of categories is failure!",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};

exports.getCategory = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Category controller");
      const categoryID = req.params.id;
      logger.info(`getCategory(), params: ${categoryID}`);
      const category = await categoryService.getCategory(categoryID);
      if (category) {
        logger.info(
          `getCategory(): get the category with ID ${categoryID} sucessfully`
        );
        const successMessageObj = {
          title: "SUCCESS",
          content: "Get successfully the category",
        };
        return apiResponse.successResponseWithData(
          res,
          successMessageObj,
          category
        );
      } else {
        return apiResponse.notFoundResponse(res, "No category found");
      }
    } catch (error) {
      logger.error(
        `getCategory(): get the category failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Get the category is failure!",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};

exports.updateCategory = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Category controller");
      const categoryID = req.params.id;
      let newCategory = {
        category_name: req.body.category_name,
      };
      logger.info(`updateCategory(), params: ${categoryID}`);
      await categoryService.updateCategory(categoryID, newCategory);
      logger.info(
        `updateCategory(): update the category with ID ${categoryID}, new category data: ${newCategory} sucessfully`
      );
      const messageObj = {
        title: "SUCCESS",
        content: "You have successfully updated the category",
      };
      return apiResponse.successResponse(res, messageObj);
    } catch (error) {
      logger.error(
        `updateCategory(): update the category failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "Update the category is failure!",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};

exports.updateAllFieldCategory = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Category controller");
      const categoryID = req.params.id;
      const pathToImage = `/images/categories/${req.file.filename}`;
      let newCategory = {
        category_name: req.body.category_name,
        category_image: pathToImage,
      };
      logger.info(`updateAllFieldCategory(), params: ${categoryID}`);
      await categoryService.updateCategory(categoryID, newCategory);
      logger.info(
        `updateAllFieldCategory(): update the category with ID ${categoryID}, new category data: ${newCategory} sucessfully`
      );
      const successMessageObj = {
        title: "SUCCESS",
        content: "You have successfully updated the category",
      };
      return apiResponse.successResponse(res, successMessageObj);
    } catch (error) {
      logger.error(
        `updateAllFieldCategory(): update the category failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "You have failed to update the category",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};

exports.deleteCategory = async (req, res) => {
  return await setTimeout(async () => {
    try {
      logger.info("Category controller");
      const categoryID = req.params.id;
      logger.info(`deleteCategory(), params: ${categoryID}`);
      await categoryService.deleteCategory(categoryID);
      logger.info(
        `deleteCategory(): delete the category with ID ${categoryID} sucessfully`
      );
      const successMessageObj = {
        title: "SUCCESS",
        content: "You have successfully deleted the category",
      };
      return apiResponse.successResponse(res, successMessageObj);
    } catch (error) {
      logger.error(
        `deleteCategory(): deelete the category failure. Message: ${error.message}. Stack: ${error.stack}`
      );
      const errorMessageObj = {
        title: "ERROR",
        content: "You have failed to delete the category",
      };
      return apiResponse.errorResponse(res, errorMessageObj);
    }
  }, 500);
};
