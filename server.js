require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes1 = require('./routes');
const routes3 = require('./routes/registerRoutes');
// instantiate express
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3003;
const logger = require('morgan');
const cookieParser = require('cookie-parser');


// cross-origin request security (CORS) 
// prevents requests to unauthorized domains
// accept requests from the client
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser());

// serve up static assets (usually on Heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
};

// add routes
// const routerLogin = require("./controllers/userController.js")
// app.use('/authenticate', routerLogin);
app.use(routes1);
app.use(routes3);


// // connect to MongoDB remotely or locally
// const MONGODB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds127260.mlab.com:27260/heroku_zpz7kd01`
// console.log(MONGODB_URI)
// mongoose.connect("mongodb://localhost/ProjectThree", {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// });

// // invoke server
// app.listen(PORT, error => {
//     if (error) throw (error)
//     console.log(`🌎 ==> API Server now listening on PORT http://localhost:${PORT}`);
// });