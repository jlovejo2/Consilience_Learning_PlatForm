const db = require('../models');

module.exports = {
    //Find all method is meant to find all classsRooms in the classroom schema
    //My need to add a component to this where we are finding all the classroom for a specific student or teacher
    findAll: function(req, res) {
      db.ClassroomModel
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //This method is meand to find a specific classroom by Id.  This will be used when wanting to pull up a specific classroom page
    findById: function(req, res) {
        db.ClassroomModel
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },

      //This will be used to create a classroom.  Goal is for only a user that is a teacher to be able to do this.  Will need user Authentification
      //Currenlty using req.body and understand that may need to be manipulated more when updating the schema
      create: function(req, res) {
          console.log(req.body);

          const newClass = {
            courseTitle: req.body.title,
            courseDiscipline: req.body.discipline,
            courseDescription: req.body.description,
            ID: req.body.userID
          }

        db.ClassroomModel
          .create(newClass)
          .then(dbModel => {
              res.json(dbModel)
                console.log('course created');
            })
          .catch(err => res.status(422).json(err));
      },

      //This will update a current classrooms information, assignments, posts, students etc.
      //Certain aspects of this will need user verification because a Teacher will have more ability to change things about classroom
      //Currenlty using req.body and understand that may need to be manipulated more when updating the schema
      update: function(req, res) {
        console.log(req.body);
        db.ClassroomModel
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },

      //This will remove the classroom
      //User verfication needed because only a teach can remove a classroom
      remove: function(req, res) {
        db.ClassroomModel
          .findById({ _id: req.params.id })
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
    };