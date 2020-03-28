const passport = require('passport');
const BearerStrategy = require('passport-http-bearer')
const RegisterModel = require('../models/register.js')
// https://www.npmjs.com/package/passport-http-bearer

//passport for authentication and authorization
passport.use(new BearerStrategy(
    function(accessToken, done) {
        RegisterModel.findOne({ accessToken })
            .then((userFound) => {
                if (userFound) {
                    return done(null, userFound)
                } else {
                    return done(null, false)
                }
            })
            .catch((error) => {
                done(error)
            })
        }
  ));

  module.exports = passport