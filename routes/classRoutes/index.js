const router = require("express").Router();
const classroomRoutes = require("./classroomRoutes");
// const userLoginRoutes = require('./userRoutes');


// Classroom routes
router.use("/classrooms", classroomRoutes);


module.exports = router;