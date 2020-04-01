const db = require('../models');
const bcrypt = require('bcryptjs')
const Chance = require('chance');
const chance = new Chance();


function registerInputValidation(request, response, next) {
    const { firstName, lastName, email, password } = request.body;
    //creating array of list of items that are missing
    const missingFields = [];
    if (!firstName) {
      missingFields.push("first name");
    }
    if (!lastName) {
      missingFields.push("last name");
    }
    if (!email) {
        missingFields.push("email");
    }
    if (!password) {
        missingFields.push("password");
    }
    if (missingFields.length) {
      response
        //status 400 for bad request, then join one or more of the above missing fields
        .status(400)
        .send(`The following fields are missing: ${missingFields.join(", ")}`);
    }
    //if no missing field, proceed to next middleware
    else {
      next();
    }
  }

//middleware to enforce unique email usage via findOne
function uniqueEmail (request, response, next) {
    //email is an object; request.body.email === {email}
    const {email} = request.body
    db.RegisterModel.findOne({email})
    .then((result) => {
        if (result) {
            response
                .status(400)
                .send(`${email} is already registered`)
        }
        else {
            next()
        }
    })
    .catch((error) => {
        console.log(error)
        response.status(500).send('error occurred')
    })
}

//create a middleware using bcryptjs npm to encrypt or "hash" user password in database
//for example, abcd1234 was converted to $2a$10$iaBPnixg3XKs2Nsl6.hM2.hG.dKFKtc.kmFoPspanv2PU8VEQdIEe via hashPW
function hashPW (request, response, next) {
    //{ password } = request.body --> request.body.password
    const { password } = request.body
    //salt is similar to concept of nonce
    bcryptjs.genSalt(10, function(error, salt) {
        bcryptjs.hash(password, salt, function (error, hash) {
            // Store hash in your password DB.
            if (error) {
                response.status(500).send("error")
            }
            else {
                request.body.password = hash
                next()
            }
        });
    });
}

function loginInputValidation (request, response, next) {
    const { email, password } = request.body;
    //creating array of list of items that are missing
    const missingFields = [];
    if (!email) {
        missingFields.push("email");
    }
    if (!password) {
        missingFields.push("password");
    }
    if (missingFields.length) {
      response
        //status 400 for bad request, then join one or more of the above missing fields
        .status(400)
        .send(`The following fields are missing: ${missingFields.join(", ")}`);
    }
    //if no missing field, proceed to next middleware
    else {
      next();
    }
}

//middleware to search for any record of user email; if found, will be located in userDocument object
function userFind (request, response, next) {
    const { email } = request.body
    db.RegisterModel.findOne({ email: email})
    .then((userDocument) => {
        if (!userDocument) {
            response
                .status(404)
                .send(`${email} not registered`)
        }
        else {
            request.userDocument = userDocument
            next()
        }
    })
    .catch((error) => {
        console.log(error)
        response
            .status(500)
            .send('Error occurred')
    })
}

//using bcrypt library to check if hashed PWs in DB match unhashed user provided PWs
function pwCheck (request, response, next) {
    const hash = request.userDocument.password
    const { password } = request.body
    bcryptjs.compare(password, hash, function(error, passwordCorrect) {
        if (error) {
            console.log(error)
            response
                .status(500)
                .send('Error occurred')
        }
        else if (passwordCorrect) {
            next()
        } else {
            response
                .status(400)
                .send('Incorrect password')
        }
    })
}

//access token middleware using chance npm to generate guid (global unique id)
function allowAccess (request, response, next) {
    const accessToken = chance.guid()
    //save accessToken to DB in user document
    //can use .save() beccause userDocument object is instance of mongoose model
    request.userDocument.accessToken = accessToken
    request.userDocument
        .save()
        .then((result) => {
            if(result) {
                response.send(accessToken)
            } else {
                response
                    .status(400)
                    .send("error")
            }
        })
        .catch((error) => {
            console.log(error)
            response
                .status(500)
                .send("error occurred")
        })
}

module.exports = {
    registerInputValidation,
    uniqueEmail,
    hashPW,
    loginInputValidation,
    userFind,
    pwCheck,
    allowAccess
}