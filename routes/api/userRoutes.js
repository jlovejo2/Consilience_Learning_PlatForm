const router = require("express").Router();
const userController = require("../../controllers/userController");



// Matches with "/api/loginUser"
router.route("/")
      .get(classroomController.findAll)
      .post(classroomController.create);