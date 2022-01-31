const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/user", UserController.storeUser);
router.get("/user", UserController.getLatestUser);
router.get("/users", UserController.getListOfUsers);
router.get("/user/:id", UserController.getUserById);
router.delete("/user/:id", UserController.deleteUser);

module.exports = router;
