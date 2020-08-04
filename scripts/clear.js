require("dotenv").config();
const mongo = require("mongodb");
const mongoose = require("mongoose");
const db = require("../models");
const userFuncs = require("../controllers/functions");

const clear = async () => {
  try {
    console.log("[clear database] : running...");

    const MONGODB_URI = `mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASSWORD}@${process.env.DB_ATLAS_CLUSTER}.mongodb.net/<dbname>?retryWrites=true&w=majority`;
    console.log(MONGODB_URI);

    const client = await mongoose.connect(
      MONGODB_URI /*|| "mongodb://localhost/ProjectThree"*/,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );

    const users = await db.RegisterModel.collection.find({}).toArray();
    const classes = await db.ClassroomModel.collection.find({}).toArray();
    const assignments = await db.AssignmentModel.collection.find({}).toArray();
    const announcements = await db.AnnouncementModel.collection
      .find({})
      .toArray();
    const comments = await db.CommentModel.collection.find({}).toArray();

    if (users.length > 0) {
      const guestTeacher = await db.RegisterModel.findById(
        "5f29887ef80ae56488c25d6b"
      );
      const guestStudent = await db.RegisterModel.findById(
        "5f29870a1d6c0327fcd1639f"
      );

      await db.RegisterModel.collection.drop();

      await db.RegisterModel.insertMany([guestTeacher, guestStudent]);
    }

    if (classes.length > 0) {
      await db.ClassroomModel.collection.drop();
    }

    if (assignments.length > 0) {
      await db.AssignmentModel.collection.drop();
    }

    if (announcements.length > 0) {
      await db.AnnouncementModel.collection.drop();
    }

    if (comments.length > 0) {
      await db.CommentModel.collection.drop();
    }

    console.log("[clear] : success");
  } catch {
    throw new Error("failed to clear database");
  }
};

clear();
