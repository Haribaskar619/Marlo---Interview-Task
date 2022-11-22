const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const auth = require("../middleware/authMiddleware")

// Defining the api end points with the respective methods of CRUD operation  and Login Functionality//
router.route("/createuser").post(userController.userCreation);
router.route("/loginuser").post(userController.loginUser);
router.route("/getuser/:id").get(auth.protect, userController.getUserData)
router.route("/deleteuser/:id").delete(auth.protect, userController.deleteUser)
router.route("/edituser/:id").put(auth.protect, userController.updateUser)

module.exports = router;