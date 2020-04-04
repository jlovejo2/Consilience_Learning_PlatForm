const router = require("express").Router();
const classroomController = require("../../controllers/classroomController");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
 



// Matches with "/api/classrooms"
router.route("/")
      .get(classroomController.findAll)
      .post(classroomController.create);
    
// Matches with "/api/classrooms/:id"
router.route("/:id")
      .get(classroomController.findById)
      .post(classroomController.update)
      .delete(classroomController.remove);

router.route("/image/:id")
      .get(classroomController.findImgByClassId)
      .post(upload.single('image'), classroomController.updateClassImage)
     

module.exports = router;