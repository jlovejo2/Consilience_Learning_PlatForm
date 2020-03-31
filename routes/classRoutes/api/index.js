const router = require("express").Router();
const classroomRoutes = require("./classroomRoutes");

// Classroom routes
router.use("/classrooms", classroomRoutes);

module.exports = router;