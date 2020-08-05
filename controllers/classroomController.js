const db = require("../models");
const fs = require("fs");
const { RegisterModel } = require("../models");
const { register } = require("../client/src/serviceWorker");
// const func = require('./functions');

module.exports = {
  //Find all method is meant to find all classsRooms in the classroom schema
  //My need to add a component to this where we are finding all the classroom for a specific student or teacher
  findAll: function (req, res) {
    console.log("searching classes...");
    console.log(req.query);

    let query = {};

    if (req.query.select === "all") {
      //gets all classes regardless of what they type in the input
      query = query;
    } else if (req.query.select === "courseTitle") {
      query.courseTitle = { $regex: req.query.input, $options: "i" };
    } else if (req.query.select === "courseDescription") {
      //This query uses $regex which allows a regular expression to be delivered to mongoDb.
      //the $options: 'i'  is a mongoDb operator that specifies case insensitivity.  Will match upper and lowercases in the field string I am searchin
      query.courseDescription = { $regex: req.query.input, $options: "i" };
    } else if (req.query.select === "subject") {
      //right now this just does same as the All
      query.courseDiscipline = { $regex: req.query.input, $options: "i" };
      query = query;
    }

    console.log(query);
    db.ClassroomModel.find(query)
      .then((dbModel) => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },

  //This method is meant to find a specific classroom by Id.  This will be used when wanting to pull up a specific classroom page
  findById: function (req, res) {
    console.log("finding class by id ...");
    db.ClassroomModel.findById(req.params.id)
      .populate({ path: "announcements" })
      // .populate({path:'comments'})
      .exec((error, dbModel) => res.json(dbModel));
  },

  // populating student info
  // route: "api/classrooms/populate/:id"
  findByIdandPopulate: function (req, res) {
    console.log("populating ...");
    console.log(req.params.id);

    db.ClassroomModel.findById(req.params.id)
      // model: 'RegisterModel', select: "_id"
      // .select("teacherID courseTitle students")
      .populate({
        path: "students",
        select: ["firstName", "lastName", "email", "ID", "grades"],
      })
      // .populate({path: 'students', populate: { path: 'grades', populate: {path: 'assignments'} }})
      .populate({ path: "assignments" })
      .populate({
        path: "announcements",
        populate: {
          path: "comments",
          populate: { path: "author", select: ["-password"] },
        },
      })
      .exec((err, dbModel) => {
        // !err ?
        // CommentModel.populate(dbModel)
        console.log("database model: ", dbModel);
        res.json(dbModel);

        // res.status(422).json(err);
      });
  },

  //This will be used to create a classroom.  Goal is for only a user that is a teacher to be able to do this.  Will need user Authentification
  //Currenlty using req.body and understand that may need to be manipulated more when updating the schema
  create: function (req, res) {
    console.log(req.body);

    const newClass = {
      courseTitle: req.body.title,
      courseDiscipline: req.body.discipline,
      courseDescription: req.body.description,
      teacherID: req.body.userID,
    };

    db.ClassroomModel.create(newClass)
      .then((dbModel) => {
        res.json(dbModel);
        console.log("course created");
      })
      .catch((err) => res.status(422).json(err));
  },

  //This will update a current classrooms information, assignments, title, descript, but not something that is an array of obect ids
  //Certain aspects of this will need user verification because a Teacher will have more ability to change things about classroom
  //Currenlty using req.body and understand that may need to be manipulated more when updating the schema
  update: function (req, res) {
    db.ClassroomModel.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  //This is used to place a student into a classroom
  //Route: "api/classrooms/:id/addStudent"
  //:id is class id, student id is sent through the body
  AddStudentToClass: async function (req, res) {
    console.log("adding student to class ...");

    const userID = req.body.id;
    const classroomID = req.params.id;

    if (userID === "") {
      res
        .status(500)
        .json({
          error: 2,
          msg: "User must create an account to join a class.",
        });
      throw new Error("User is does not exist in database");
    }
    try {
      const findUserRequestingToJoin = await db.RegisterModel.findOne({
        _id: userID,
      });

      const getClassroomJoined = await db.ClassroomModel.findOneAndUpdate(
        { _id: classroomID },
        { $push: { students: findUserRequestingToJoin._id } }
      );

      console.log(getClassroomJoined);
      res.json(getClassroomJoined);
    } catch (err) {
      res.status(500).json({
        error: 1,
        msg: "User was not added to the class.  Please try again later!",
      });

      throw new Error(`Error adding the user to the class: ${err}`);
    }
  },

  //This will remove the classroom
  //User verfication needed because only a teach can remove a classroom
  remove: function (req, res) {
    db.ClassroomModel.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findImgByClassId: function (req, res) {
    db.ClassroomModel.findById(req.params.id, "image")
      .then((dbModel) => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },

  //This code is specifically for when adding an image to the classroom card.  req.file is created using the multer npm
  //If it is too bulky we can always make a specific route
  //If confused I followed steps in this link: https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
  //It allows that image to be uploaded to a folder called uploaded.  Then it is saved to the mongo database when delivered as an object in findOneandUpdat
  updateClassImage: function (req, res) {
    const newData = {
      image: {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      },
    };

    db.ClassroomModel.findOneAndUpdate({ _id: req.params.id }, newData)
      .then((dbModel) => {
        console.log("updated");
        //deletes the file from the temporary uploads folder
        fs.unlinkSync(req.file.path);
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },

  createAnnouncement: function (req, res) {
    console.log(req.body);
    console.log(req.params.id);

    db.AnnouncementModel.create(req.body)
      .then((dbModel) => {
        console.log("announcement created");

        db.ClassroomModel.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { announcements: dbModel._id } }
        )
          .populate({ path: "announcements" })
          .exec((err, updatedClass) => {
            console.log("post update", updatedClass);
            res.json(updatedClass);
          });
      })
      .catch((err) => res.status(422).json(err));
  },

  removeAnnouncement: function (req, res) {
    console.log(req.params.id);
    db.AnnouncementModel.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findAnnouncementsByClassId: function (req, res) {
    console.log(req.body);
    console.log(req.params.id);
  },

  createComment: function (req, res) {
    console.log(req.params);
    console.log(req.body);
    console.log(req.body.body);
    console.log(req.body.announcementID);

    db.CommentModel.create(req.body).then((newComment) => {
      db.AnnouncementModel.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comments: newComment._id } }
      ).then((updatedAnnouncement) => {
        console.log(updatedAnnouncement);
        res.json(updatedAnnouncement);
      });
    });

    // .catch(err => console.log(err))
  },

  findAuthorById: function (req, res) {
    console.log("finding user by id");
    console.log(req.body);
    db.AnnouncementModel.find({ comments: { _id: req.body.id } }).then(
      (resp) => {
        console.log("got the response", resp);
        // if (resp.alias) {
        //   res.json({ alias: resp.alias })
        // } else {
        //   const fullName = resp.firstName + " " + resp.lastName
        //   res.json({ name: fullName })
        // }
      }
    );
  },

  //This function will find all the classes that the user is either a student or a teacher for
  findClassesByUser: function (req, res) {
    console.log(req.params.id);

    db.ClassroomModel.find({
      $or: [
        {
          students: { $elemMatch: { $eq: req.params.id } },
        },
        { teacherID: { $eq: req.params.id } },
      ],
    }).then((dbModel) => {
      console.log(dbModel);
      res.json(dbModel);
    });
  },

  removeComment: function (req, res) {
    console.log(req.params.id);

    db.CommentModel.findById(req.params.id)
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  createAssignment: function (req, res) {
    console.log(req.body);
    console.log(req.params.id);

    db.AssignmentModel.create(req.body)
      .then((dbModel) => {
        console.log("Assignment created");

        db.ClassroomModel.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { assignments: dbModel._id } }
        )
          // .populate({ path: 'assignments' })
          .exec((err, updatedClass) => {
            console.log("post update", updatedClass);
            res.json(updatedClass);
          });
      })
      .catch((err) => res.status(422).json(err));
  },

  addGrade: function (req, res) {
    console.log("params: ", req.params.classID, req.params.userID);
    console.log("body: ", req.body);

    db.ClassroomModel.findById(req.params.classID)
      .populate("assignments", "title")
      .then((resp) => {
        const keysArr = Object.keys(req.body);
        keysArr.length = keysArr.length - 1;

        const titleArr = keysArr.filter((value, index) => {
          return index > 3;
        });

        const valuesArr = Object.values(req.body);
        valuesArr.length = valuesArr.length - 1;

        const gradesArr = valuesArr.filter((value, index) => {
          console.log(index);
          return index > 3;
        });

        // if(gradesArr.length != keysArr.length )
        // throw new Error('Error: grades array length does not match keys Arr length')

        console.log(titleArr);
        console.log(gradesArr);

        try {
          function saveloop() {
            for (i = 0; i < titleArr.length; i++) {
              let titleItem = titleArr[i];
              let gradeItem = gradesArr[i];

              // await db.AssignmentModel
              //   .findOne({ title: { $regex: titleItem, $options: 'i' } })
              //   .then(assignmentModel => {
              // console.log('assignment return', assignmentModel)
              // console.log('assignment id ', assignmentModel._id)

              console.log("assignment title", titleItem);
              console.log("class ID ", resp._id);
              console.log("grade ", gradeItem);

              db.RegisterModel.findOneAndUpdate(
                { ID: req.body.ID },
                {
                  $push: {
                    grades: {
                      classId: resp._id,
                      assignment: titleItem,
                      grade: gradeItem,
                    },
                  },
                }
              ).then((updatedUser) => {
                console.log("updated user: ", updatedUser);
                res.json(updatedUser);
              });
              //  })
            }
          }
          saveloop();
        } catch (err) {
          console.log("error in save loop", err);
        }
      });
  },

  getGrades: function (req, res) {
    //need userID as param,

    //go into register model and get grades array which has
    // class ID, assignment ID, grade

    //use assignment ID to get assignment title
    // attach to grade and send back json with array

    db.RegisterModel.findById(req.params.id).then((user) => {
      const userGradesArr = user.grades.map((grade) => {
        const obj = {
          assignmentId: grade.assignment,
          grade: grade.grade,
        };
        return obj;
      });

      console.log(userGradesArr);
    });
  },
};
