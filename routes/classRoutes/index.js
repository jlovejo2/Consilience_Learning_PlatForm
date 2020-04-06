// mergeParams: true option passed to merge parameters created
// here with upstream parent routes. Why?
// params established in parent routes would be inaccessible otherwise
const router = require("express").Router({ mergeParams: true });
const classroomRoutes = require("./classroomRoutes");
// const userLoginRoutes = require('./userRoutes');


// Classroom routes
router.use("/classrooms", classroomRoutes);


module.exports = router;