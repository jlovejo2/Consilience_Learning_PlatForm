require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
// instantiate express
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3003;
const logger = require("morgan");
const cookieParser = require("cookie-parser");

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
  app.use(express.static("client/build"));
}

// use routes
app.use(routes);

// connect to MongoDB remotely or locally
// when ready for production, go to userController and set
// router.post('/login) cookie parameter "secure" to true

//below is mongoDb uri when connecting to heroku via mLab. Mlab is now apart of mongoDb and been made obsolete.
//const MONGODB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds143039.mlab.com:43039/heroku_hkn7jqvr`;
const MONGODB_URI = `mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASSWORD}@${process.env.DB_ATLAS_CLUSTER}.mongodb.net/<dbname>?retryWrites=true&w=majority`;
console.log(MONGODB_URI);
mongoose.connect(MONGODB_URI /*|| "mongodb://localhost/ProjectThree"*/, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// invoke server
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(
    `🌎 ==> API Server now listening on PORT http://localhost:${PORT}`
  );
});
