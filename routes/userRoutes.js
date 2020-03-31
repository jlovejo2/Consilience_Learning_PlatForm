const router = require("express").Router();
const userController = require("../controllers/userController");


// Matches with "/loginUser/"
router.route("/")
      .post(userController.create)