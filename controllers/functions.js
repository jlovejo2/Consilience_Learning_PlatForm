const db = require('../models')


module.exports = {

//This is a function that will automatically generate a student Id for a student user
//Id generated is based on first and last name.  If someone with the same username exists in database it is incremented by 1.
//first and last name parameters are strings
 studentIdGenerator: function(firstname, lastname) {
    const first = firstname.toLowerCase()
    const last = lastname.toLowerCase()

    const stepOne = first.slice(0,1) + last.slice(0,6);

   return db.RegisterModel.find({lastName: lastname, type: 'student'})
        .then(resp => {
            const stepTwo = resp.length
            const ID = stepOne + stepTwo
            console.log(ID);
            return ID
        })
        .catch(err => console.log(err))
},

staffIDGenerator: function(firstname, lastname, discipline) {
    const first = firstname.toLowerCase()
    const last = lastname.toLowerCase()
    const disc = discipline.toLowerCase()

    const stepOne = first.slice(0,1) + last.slice(0,6).trim() + disc.slice(0,4).trim();

   return db.RegisterModel.find({lastName: lastname, type: 'teacher'})
        .then(resp => {
            const stepTwo = resp.length
            const ID = stepOne + stepTwo
            console.log(ID);
            return ID
        })
        .catch(err => console.log(err))
},

urlHttpToHttps: function(url) {
    const slicedURL = url.slice(4, url.length)
    const secureURL = 'https' + slicedURL

    return secureURL
}

}

// studentIdGenerator(firstName, lastName);