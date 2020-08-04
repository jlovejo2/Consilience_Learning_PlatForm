require("dotenv").config();
const mongo = require("mongodb");
const mongoose = require("mongoose");
const db = require("../models");
const userFuncs = require("../controllers/functions");

const users = [
  {
    _id: new mongo.ObjectId("5f29698dda48af2f3c8b8170"),
    type: "Student",
    firstName: "Joe",
    lastName: "Tribiani",
    email: "jtrib@gmail.com",
    password: "password_**********",
    ID: "",
    grades: [],
    creatDate: new Date(),
  },
  {
    _id: new mongo.ObjectId("5f29698dda48af2f3c8b8171"),
    type: "Student",
    firstName: "Mary",
    lastName: "Life",
    email: "mlife@gmail.com",
    password: "password_**********",
    ID: "",
    grades: [],
    creatDate: new Date(),
  },
  {
    _id: new mongo.ObjectId("5f29698dda48af2f3c8b8172"),
    type: "Student",
    firstName: "Fred",
    lastName: "George",
    email: "fGeorge@gmail.com",
    password: "password_**********",
    ID: "",
    grades: [],
    creatDate: new Date(),
  },
  {
    _id: new mongo.ObjectId("5f29698dda48af2f3c8b8173"),
    type: "Student",
    firstName: "Rachel",
    lastName: "Green",
    email: "rGreen@gmail.com",
    password: "password_**********",
    ID: "",
    grades: [],
    creatDate: new Date(),
  },
  {
    _id: new mongo.ObjectId("5f29698dda48af2f3c8b8174"),
    type: "Student",
    firstName: "Chandler",
    lastName: "Bing",
    email: "cBing@gmail.com",
    password: "password_**********",
    ID: "",
    grades: [],
    creatDate: new Date(),
  },
  {
    _id: new mongo.ObjectId("5f29698dda48af2f3c8b8175"),
    type: "Teacher",
    firstName: "Ross",
    lastName: "Gellar",
    discipline: "Paleantology",
    email: "rGellar@gmail.com",
    password: "password_**********",
    ID: "",
    grades: [],
    creatDate: new Date(),
  },
  {
    _id: new mongo.ObjectId("5f29698dda48af2f3c8b8176"),
    type: "Teacher",
    firstName: "Phoebe",
    lastName: "Buffet",
    discipline: "Music",
    email: "pBuffet@gmail.com",
    password: "password_**********",
    ID: "",
    grades: [],
    creatDate: new Date(),
  },
];

const classes = [
  {
    courseDiscipline: "",
    courseTitle: "",
    courseDescription: "",
    students: [{}, {}],
    teacherID: "",
    assignments: [{}, {}],
    createDate: new Date(),
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
      let userID = "";

      if (user.type === "Teacher") {
        userID = await userFuncs.staffIDGenerator(
          user.firstName,
          user.lastName,
          user.Discipline
        );
      } else {
        userID = await userFuncs.studentIdGenerator(
          user.firstName,
          user.lastName
        );
      }
      user.ID = userID;
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
