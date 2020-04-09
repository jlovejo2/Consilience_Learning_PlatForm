const path = require("path");
// mergeParams: true option passed to merge parameters created
// here with upstream parent routes. Why?
// params established in parent routes would be inaccessible otherwise 
const router = require("express").Router({ mergeParams: true });
const apiRoutes = require('./classRoutes');
const userController = require('../controllers/userController.js');
// const aController = require('../controllers/announcementController');

router.use('/users', userController);

// API Routes
router.use('/api', apiRoutes);


//External API routes
// router.route('route for methods directly to a controller')
//     .get('require the controller above and then bring in the method')

// If no API routes are hit, send the React app
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;