const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/user", userController.addUser);
router.get("/users", userController.getUsers);
router.get("/user", userController.getLatestUser);
router.get("/user/:id", userController.getUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
