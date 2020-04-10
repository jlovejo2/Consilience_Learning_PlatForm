const db = require('../models');
const fs = require('fs');
const { RegisterModel } = require('../models');
const { register } = require('../client/src/serviceWorker');
// const func = require('./functions');

module.exports = {
  //Find all method is meant to find all classsRooms in the classroom schema
  //My need to add a component to this where we are finding all the classroom for a specific student or teacher
  findAll: function (req, res) {
    console.log('searching classes...')
    console.log(req.query)

    let query = {}

    if (req.query.select === 'all') {
      //gets all classes regardless of what they type in the input
      query = query
    } else if (req.query.select === 'courseTitle') {
      query.courseTitle = req.query.input
    } else if (req.query.select === 'courseDescription') {
      //This query uses $regex which allows a regular expression to be delivered to mongoDb.
      //the $options: 'i'  is a mongoDb operator that specifies case insensitivity.  Will match upper and lowercases in the field string I am searchin
      query.courseDescription = { "$regex": req.query.input, "$options": "i" }
    } else if (req.query.select === 'subject') {
      //right now this just does same as the All
      query = query
    }

    console.log(query);
    db.ClassroomModel
      .find(query)
      .then(dbModel => {
        console.log(dbModel)
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  //This method is meant to find a specific classroom by Id.  This will be used when wanting to pull up a specific classroom page
  findById: function (req, res) {
    console.log('finding class by id ...')
    db.ClassroomModel
      .findById(req.params.id)
      .populate({ path: 'announcements' })
      // .populate({path:'comments'})
      .exec((error, dbModel) => res.json(dbModel))
  },

  // populating student info 
  // route: "api/classrooms/populate/:id"
  findByIdandPopulate: function (req, res) {
    console.log('populating ...')
    console.log(req.params.id)
    db.ClassroomModel
      .findById(req.params.id)
      // model: 'RegisterModel', select: "_id"
      // .select("teacherID courseTitle students")
      .populate({ path: "students", select: ['firstName', 'lastName', 'email'] })  /*'firstName lastName email -_id'}*/
      .populate({ path: 'announcements', populate: {path: 'comments', populate: { path: 'authors' } }})
      .exec((err, dbModel) => {
        // !err ?
        console.log(dbModel)
        res.json(dbModel)


        // res.status(422).json(err);
      })
  },

  //This will be used to create a classroom.  Goal is for only a user that is a teacher to be able to do this.  Will need user Authentification
  //Currenlty using req.body and understand that may need to be manipulated more when updating the schema
  create: function (req, res) {
    console.log(req.body);

    const newClass = {
      courseTitle: req.body.title,
      courseDiscipline: req.body.discipline,
      courseDescription: req.body.description,
      teacherID: req.body.userID
    }

    db.ClassroomModel
      .create(newClass)
      .then(dbModel => {
        res.json(dbModel)
        console.log('course created');
      })
      .catch(err => res.status(422).json(err));
  },

  //This will update a current classrooms information, assignments, title, descript, but not something that is an array of obect ids
  //Certain aspects of this will need user verification because a Teacher will have more ability to change things about classroom
  //Currenlty using req.body and understand that may need to be manipulated more when updating the schema
  update: function (req, res) {
    db.ClassroomModel
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //This is used to place a student into a classroom
  //Route: "api/classrooms/:id/addStudent"
  //:id is class id, student id is sent through the body
  AddStudentToClass: function (req, res) {
    console.log('adding student to class ...')
    console.log(req.body)
    db.RegisterModel
      .findOne({ _id: req.body.id })
      .then(dbModel => {
        db.ClassroomModel.findOneAndUpdate({ _id: req.params.id }, { $push: { students: dbModel._id } })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })
  },

  //This will remove the classroom
  //User verfication needed because only a teach can remove a classroom
  remove: function (req, res) {
    db.ClassroomModel
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findImgByClassId: function (req, res) {
    db.ClassroomModel
      .findById(req.params.id, 'image')
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  //This code is specifically for when adding an image to the classroom card.  req.file is created using the multer npm
  //If it is too bulky we can always make a specific route
  //If confused I followed steps in this link: https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
  //It allows that image to be uploaded to a folder called uploaded.  Then it is saved to the mongo database when delivered as an object in findOneandUpdat     
  updateClassImage: function (req, res) {

    const newData = {
      image: {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype
      }
    }

    db.ClassroomModel
      .findOneAndUpdate({ _id: req.params.id }, newData)
      .then(dbModel => {
        console.log('updated')
        //deletes the file from the temporary uploads folder
        fs.unlinkSync(req.file.path)
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  createAnnouncement: function (req, res) {

    console.log(req.body)
    console.log(req.params.id)

    db.AnnouncementModel.create(req.body)
      .then(dbModel => {

        console.log('announcement created');

        db.ClassroomModel
          .findOneAndUpdate({ _id: req.params.id }, { $push: { announcements: dbModel._id } })
          .populate({ path: 'announcements' })
          .exec((err, updatedClass) => {
            console.log("post update", updatedClass)
            res.json(updatedClass);
          })
      })
      .catch(err => res.status(422).json(err));

  },

  removeAnnouncement: function (req, res) {
    console.log(req.params.id)
    db.AnnouncementModel
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAnnouncementsByClassId: function (req, res) {
    console.log(req.body);
    console.log(req.params.id)
  },

  createComment: function (req, res) {
    console.log(req.params)
    console.log(req.body)
    console.log(req.body.body)
    console.log(req.body.announcementID)

    db.CommentModel
      .create(req.body)
      .then(newComment => {

        db.AnnouncementModel
      .findOneAndUpdate({ _id: req.params.id }, { $push: { comments: newComment._id } })
      .then(updatedAnnouncement => {
        console.log(updatedAnnouncement)
        res.json(updatedAnnouncement)
      })
      })

    // .catch(err => console.log(err))
  },

  findAuthorById: function (req, res) {
    console.log('finding user by id')
    console.log(req.body)
    db.AnnouncementModel
      .find({ comments: { _id: req.body.id }})
      .then(resp => {

        console.log('got the response', resp)
        // if (resp.alias) {
        //   res.json({ alias: resp.alias })
        // } else {
        //   const fullName = resp.firstName + " " + resp.lastName
        //   res.json({ name: fullName })
        // }
      })
  },

  //This function will find all the classes that the user is either a student or a teacher for
  findClassesByUser: function (req, res) {

    console.log(req.params.id)

    db.ClassroomModel
      .find( { $or: [{
         students: { $elemMatch: { $eq: req.params.id} }
      }, {teacherID: { $eq: req.params.id} }]})
      .then(dbModel => {
        console.log(dbModel)
        res.json(dbModel)
      })

  }


};