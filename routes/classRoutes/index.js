const path = require("path");
const router = require("express").Router();
const apiRoutes = require('./api');


// API Routes
router.use('/api', apiRoutes);

//External API routes
// router.route('route for methods directly to a controller')
//     .get('require the controller above and then bring in the method')

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;