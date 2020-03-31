const router = require("express").Router();
const userController = require("../../../controllers/userController");


// Matches with "/api/classrooms"
router.route("/")
      .get(userController.findAll)
      .post(userController.create);
    
// Matches with "/api/classrooms/:id"
router.route("/:id")
      .get(userController.findById)
      .put(userController.update)
      // .delete(userController.remove);
     

module.exports = router;