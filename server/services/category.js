const Category = require("../models/category");
const logger = require("../config/logger");
const baseURL = "http://localhost:4100";

const addCategory = async (data) => {
  try {
    logger.info("Category service");
    const category = new Category(data);
    const result = await category.save();
    logger.debug(JSON.stringify(result));
  } catch (error) {
    logger.error(
      `addCategory(): Error occurs while add new a category: Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const getCategories = async () => {
  try {
    logger.info("Category service");
    const result = await Category.find({}).lean();
    if (result) {
      logger.debug(JSON.stringify(result));
      return result.map((category) => ({
        ...category,
        category_image: baseURL + category.category_image,
      }));
    } else {
      return null;
    }
  } catch (error) {
    logger.error(
      `getCategories(): Error occurs while get all categories. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const getCategory = async (categoryID) => {
  try {
    logger.info("Category service");
    const result = await Category.findOne({ _id: categoryID });
    if (result) {
      logger.debug(JSON.stringify(result));
      return result;
    } else {
      return null;
    }
  } catch (error) {
    logger.error(
      `getCategory(): Error occurs while get category with ID ${categoryID}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const updateCategory = async (categoryID, data) => {
  try {
    logger.info("Category service");
    const result = await Category.updateOne({ _id: categoryID }, data);
    logger.debug(JSON.stringify(result));
  } catch (error) {
    logger.error(
      `updateCategory(): Error occurs while update the category with ID: ${categoryID}, data: ${data}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const deleteCategory = async (categoryID) => {
  try {
    logger.info("Category service");
    const result = await Category.remove({ _id: categoryID });
    logger.debug(JSON.stringify(result));
  } catch (error) {
    logger.error(
      `deleteCategory(): Error occurs while delete the category with ID: ${categoryID}. Message: ${error.message}. Stack: ${error.stack}`
    );
  }
};

module.exports = {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
