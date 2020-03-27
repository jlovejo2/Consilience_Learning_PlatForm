require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3003;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve up static assets (usually on Heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
};

// add routes for API and view
// app.use(routes);

// connect to MongoDB
const MONGODB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds347665.mlab.com:47665/heroku_00fjp6g3`
console.log(MONGODB_URI)
mongoose.connect("mongodb://localhost/ProjectThree", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// Start API server
app.listen(PORT, () => {
    console.log(`🌎 ==> API Server now listening on PORT http://localhost:${PORT}!`);
});