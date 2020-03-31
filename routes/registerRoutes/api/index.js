const router = require("express").Router();
const userRoutes = require('./userRoutes.js');

// Classroom routes
router.use("/users", userRoutes);

module.exports = router;