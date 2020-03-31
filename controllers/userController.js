const db = require('../models');


module.exports ={

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

}