const User = require("../models/user");
const baseURL = "http://localhost:4100";

class UserController {
  storeUser(req, res) {
    setTimeout(() => {
      console.log("This is Store Controller: ");
      try {
        const value = req.body;
        const data = {
          user_name: value.name,
          user_phoneNumber: value.phoneNumber,
          user_address: value.address,
        };
        const user = new User(data);
        user.save().then(() => {
          return res.status(200).json({
            message: {
              title: "SUCCESS",
              content: "You have entered the information successfully",
            },
            status: 1,
          });
        });
      } catch (error) {
        return res.status(500).json({
          message: {
            title: "ERROR",
            content: "You have entered the information failure",
          },
          status: 0,
        });
      }
    }, 100);
  }

  getLatestUser(req, res) {
    try {
      console.log("This is Get Latest User Controller: ");
      User.findOne({})
        .sort({ _id: -1 })
        .then((data) => {
          return res.status(200).json({
            message: {
              title: "SUCCESS",
              content: "You have successfully fetched the latest user",
            },
            status: 1,
            data: data,
          });
        });
    } catch (error) {
      return res.status(500).json({
        message: {
          title: "ERROR",
          content: "You have failed to fetch the latest user",
        },
        status: 0,
        data: data,
      });
    }
  }

  getListOfUsers(req, res) {
    console.log("THIS IS USER CONTROLLER");
    setTimeout(() => {
      try {
        User.find({}).then((data) => {
          return res
            .status(200)
            .json({
              message: "Fetch successfully list of users",
              status: 1,
              data: data,
            });
        });
      } catch (error) {
        return res
          .status(500)
          .json({
            message: "ERROR: Fetch list of users is failure!!",
            status: 0,
          });
      }
    }, 500);
  }

  getUserById(req, res) {
    console.log("get user by id:");
    console.log(req.params);
    try {
      User.findOne({ _id: req.params.id }).then((data) => {
        return res.json({
          message: "Fetch user by id successful!!",
          status: 1,
          data: data,
        });
      });
    } catch (error) {
      return res.json({ message: "Fetch user by id failure!!", status: 0 });
    }
  }

  deleteUser(req, res) {
    try {
      const userId = req.params.id;
      User.remove({ _id: userId }).then(() => {
        return res
          .status(200)
          .json({
            message: {
              title: "SUCCESS",
              content: "You have successfully deleted the user",
            },
            status: 1,
          });
        // return res.status(200).json({ message: {title: "ERROR", content: "You have failed to delete the user"},  status: 0});
      });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: {
            title: "ERROR",
            content: "You have failed to delete the user",
          },
          status: 0,
        });
      e;
      // return res.status(500).json({ message: {title: "SUCCESS", content: "You have successfully deleted the user"},  status: 1});
    }
  }
}

module.exports = new UserController();
