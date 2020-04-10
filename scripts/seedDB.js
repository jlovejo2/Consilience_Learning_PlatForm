const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

// const MONGODB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds127260.mlab.com:27260/heroku_zpz7kd01`
// console.log(MONGODB_URI)
mongoose.connect("mongodb://localhost/ProjectThree", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const AsssignmentSeed = [
  {
    title: 'seed assignment title',
    body: 'seeded assigmment body'
  }
]

const AnnouncementSeed = [
  {
    title: 'seededAnnouncement title',
    body: 'seeded Announcement body',
  }
]
db.AssignmentModel
  .remove({})
  .then(() => db.AssignmentModel.collection.insertMany(AsssignmentSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    // process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  db.AnnouncementModel
  .remove({})
  .then(() => db.AnnouncementModel.collection.insertMany(AnnouncementSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
