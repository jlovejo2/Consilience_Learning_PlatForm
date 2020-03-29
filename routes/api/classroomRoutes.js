const router = require("express").Router();
const classroomController = require("../../controllers/classroomController");



// Matches with "/api/classrooms/"
router.route("/")
      .get(classroomController.findAll)
      .post(classroomController.create);
    
// Matches with "/api/classrooms/:id"
router.route("/:id")
      .get(classroomController.findById)
      .post(classroomController.update)
      .delete(classroomController.remove);
     

module.exports = router;