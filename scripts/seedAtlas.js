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
  {
    _id: new mongo.ObjectId("5f29698dda48af2f3c8b8177"),
    type: "Teacher",
    firstName: "Isaac",
    lastName: "Assimov",
    discipline: "Science",
    email: "iAssimov@gmail.com",
    password: "password_**********",
    ID: "",
    grades: [],
    creatDate: new Date(),
  },
];

const classes = [
  {
    courseDiscipline: "Science",
    courseTitle: "The fundamentals of Physics",
    courseDescription:
      "This class will cover the basics of physics in regards to mechanical systems as well as electrical and magnetic systems.",
    students: [
      new mongo.ObjectId("5f29698dda48af2f3c8b8170"),
      new mongo.ObjectId("5f29698dda48af2f3c8b8171"),
      new mongo.ObjectId("5f29698dda48af2f3c8b8172"),
    ],
    teacherID: new mongo.ObjectId("5f29698dda48af2f3c8b8177"),
    assignments: [],
    createDate: new Date(),
  },
  {
    courseDiscipline: "Science",
    courseTitle: "Experimental Physics",
    courseDescription:
      "This class will blur the lines of science and science fiction until the disctintion between the two is limited by only your imagination.",
    students: [
      new mongo.ObjectId("5f29698dda48af2f3c8b8171"),
      new mongo.ObjectId("5f29698dda48af2f3c8b8174"),
      new mongo.ObjectId("5f29698dda48af2f3c8b8173"),
    ],
    teacherID: new mongo.ObjectId("5f29698dda48af2f3c8b8177"),
    assignments: [],
    createDate: new Date(),
  },
  {
    courseDiscipline: "Writing",
    courseTitle: "Creative Writing",
    courseDescription:
      "This course is more of a structured feedback group. Here we learn how to take an idea of story and turn it into something worth reading.",
    students: [
      new mongo.ObjectId("5f29698dda48af2f3c8b8173"),
      new mongo.ObjectId("5f29698dda48af2f3c8b8174"),
      new mongo.ObjectId("5f29698dda48af2f3c8b8176"),
    ],
    teacherID: new mongo.ObjectId("5f29698dda48af2f3c8b8177"),
    assignments: [],
    createDate: new Date(),
  },
  {
    courseDiscipline: "Anthropology",
    courseTitle: "The History of Early Humans",
    courseDescription:
      "This class will cover timeline of evolution for early homosapiens.",
    students: [
      new mongo.ObjectId("5f29698dda48af2f3c8b8170"),
      new mongo.ObjectId("5f29698dda48af2f3c8b8171"),
      new mongo.ObjectId("5f29698dda48af2f3c8b8172"),
    ],
    teacherID: new mongo.ObjectId("5f29698dda48af2f3c8b8177"),
    assignments: [{}, {}],
    createDate: new Date(),
  },
  {
    courseDiscipline: "Music",
    courseTitle: "Guitar: for beginners",
    courseDescription:
      "This class will cover how to buy a guitar for you, how to set-up your equipment, and then finally how to play said guitar!",
    students: [
      new mongo.ObjectId("5f29698dda48af2f3c8b8170"),
      new mongo.ObjectId("5f29698dda48af2f3c8b8171"),
      new mongo.ObjectId("5f29698dda48af2f3c8b8172"),
    ],
    teacherID: new mongo.ObjectId("5f29698dda48af2f3c8b8177"),
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
          user.discipline
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

    for (const classroom of classes) {
      await db.ClassroomModel.collection.insertOne(classroom);
    }

    console.log("[seed] : success ");
  } catch {
    throw new Error("failed to seed database");
  }
};

seed();
