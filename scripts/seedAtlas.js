require("dotenv").config();
const mongo = require("mongodb");
const mongoose = require("mongoose");
const db = require("../models");

const users = [
  {
    _id: new mongo.ObjectId("5f29698dda48af2f3c8b8170"),
    type: "Student",
    firstName: "Joe",
    lastName: "Tribiani",
    email: "jtrib@gmail.com",
    password: "password_**********",
    ID: "jtribian0",
    grades: [],
    creatDate: new Date("<YYYY-mm-ddTHH:MM:ssZ>"),
  },
];

const seed = async () => {
  try {
    console.log("[seed] : running...");
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

    for (const user of users) {
      console.log(user);
      console.log(db.registers);
      await db.RegisterModel.collection.insertOne(user);
    }

    console.log("[seed] : success ");
  } catch {
    throw new Error("failed to seed database");
  }
};

seed();
