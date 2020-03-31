const db = require('../models');


module.exports ={
  findAll: function(req, res) {
    db.RegisterModel
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //This method is meand to find a specific classroom by Id.  This will be used when wanting to pull up a specific classroom page
  findById: function(req, res) {
      db.RegisterModel
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        console.log(req.body);
      db.RegisterModel
        .create(req.body)
        .then(dbModel => {
            res.json(dbModel)
              console.log('user saved');
          })
        .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
      db.RegisterModel
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}