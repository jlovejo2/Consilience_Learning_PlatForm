// mergeParams: true option passed to merge parameters created
// here with upstream parent routes. Why?
// params established in parent routes would be inaccessible otherwise
const router = require("express").Router({ mergeParams: true });
const classroomController = require("../../controllers/classroomController");
// const aController = require('../../controllers/announcementController')
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
      
//Matchers with "/api/classroom/user/:id"
router.route('/user/:id')
      .get(classroomController.findClassesByUser)

// router.route('/:selectValue/:inputValue')
//       .get(classroomController.findAll)

router.route('/:id/addStudent')
      .post(classroomController.AddStudentToClass)

router.route("/populate/:id")
      .get(classroomController.findByIdandPopulate);

router.route("/image/:id")
      .get(classroomController.findImgByClassId)
      .post(upload.single('image'), classroomController.updateClassImage)
 
router.route("/announcement/")
      

router.route("/announcement/:id")
      .get(classroomController.findAnnouncementsByClassId)
      .post(classroomController.createAnnouncement)
      .delete(classroomController.removeAnnouncement)

router.route("/announcement/comment/:id")
      .post(classroomController.createComment)
      .delete()

router.route('/findAuthor/comment/:id')
      .get(classroomController.findUserById)

module.exports = router;