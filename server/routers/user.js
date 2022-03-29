const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const jwtHelper = require("../config/jwtHelper")

// router.post("/user/register", userController.register);
router.post("/user", userController.register);
router.post("/user/authenticate", userController.login);
router.get("/user/profile", jwtHelper.verifyJwtToken, userController.userProfile);
router.get("/users", userController.getUsers);
router.get("/user", userController.getLatestUser);
router.get("/user/:id", userController.getUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
