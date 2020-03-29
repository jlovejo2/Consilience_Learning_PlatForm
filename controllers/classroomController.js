const db = require('../models');

module.exports = {
    findAll: function(req, res) {
      db.ClassroomModel
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.ClassroomModel
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      create: function(req, res) {
          console.log(req.body);
        db.ClassroomModel
          .create(req.body)
          .then(dbModel => {
              res.json(dbModel)
                console.log('book saved');
            })
          .catch(err => res.status(422).json(err));
      },
     