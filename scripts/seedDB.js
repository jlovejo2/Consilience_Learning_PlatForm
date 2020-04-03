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

const classSeed = [
  {
    courseDiscipline: "Math",
    courseTitle: "Algebra",
    courseDescription: 
    'This class while cover your typical Alegebra 1&2 curriculum.  The goal is to get you ready for preCalc courses',
    staffId: '01',
    students: ['Joe', 'Andy', 'Shirley'],
    createDate: 4-2-20
  },
  {
    courseDiscipline: "History",
    courseTitle: "U.S. History",
    courseDescription: 
    "This course will cover U.S. history from 1600 (pre United States) up until the 20th century",
    staffId: '01',
    students: ['Billy', 'Theresa', 'Jebediah'],
    createDate: 4-2-20
  },
  {
    courseDiscipline: "Science",
    courseTitle: "Physics: Mechanics",
    courseDescription: 
    "This course will go into depth of the magic of phyics in all things mechanical",
    staffId: '01',
    students: ['Ange', 'Andrew', 'Brieanne'],
    createDate: 4-2-20
  },
];

const userSeed = [
    {
        type: 'student',
        firstName: 'James',
        lastName: 'Lovejoy',
        studentID: 'jlovejo1',
        email: 'james.lovejoy2@gmail.com',
        password: '11111111',
        createDate: '4-3-20'

    },
    {
        type: 'student',
        firstName: 'Jimmy',
        lastName: 'Smith',
        studentID: 'jsmith1',
        email: 'j.smith@gmail.com',
        password: '22222222',
        createDate: '4-3-20'
    },
    {
        type: 'student',
        firstName: 'Jerry',
        lastName: 'Smith',
        studentID: 'jsmith2',
        email: 'smithyBoy@gmail.com',
        password: '33333333',
        createDate: '4-3-20'
    },
    {
        type: 'teacher',
        firstName: 'Alan',
        lastName: 'Bladwin',
        staffID: '01',
        email: 'AlanTheGreat@gmail.com',
        password: '44444444',
        createDate: '4-3-20'
    },
]

db.ClassroomModel
  .remove({})
  .then(() => db.ClassroomModel.collection.insertMany(classSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    // process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  db.RegisterModel
  .remove({})
  .then(() => db.RegisterModel.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
