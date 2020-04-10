const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const validate = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const moment = require('moment');
//const dateChicago = moment.parseZone()
//const dateChicago = moment().tz("America/Chicago").format();

const RegisterSchema = new Schema(
  {
            type: {
                type: String,
                trim: true,
                // enum: ["student", "teacer"],
                required: "select role",
                // validate: `student` || `teacher` 
            },
            firstName: {
                type: String,
                trim: true,
                required: 'enter first name'
            },
            lastName: {
                type: String,
                trim: true,
                required: 'enter last name'
            },
            ID: {
                // type: Schema.Types.ObjectId,
                type: String,
                ref: 'User',
            },
            discipline: {
                type: String,
                trim: true
                },
            // TOUCH ON THIS LATER
            // activeCourses: {
            //     type: String,
            //     trim: true,
            // },
            // completedCourses: {
            //     type: Array,
            //     trim: true
            // },
            email: {
                type: String,
                validate: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                // validate: value => {
                //     if (!validator.isEmail(value)) {
                //         throw new Error({ error: 'Invalid Email address' })
                //     }
                // },
                required: true,
                unique: true
            },
            password: {
                type: String,
                // validate: /^[0-9A-Za-z!@.,;:'"?-]{8,50}\z/,
                required: true,
                minlength: 8,
                maxlength: 64
            },
            grades: [
                {
                  classId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Classroom',
                  },
                  assignment: {
                    type: Schema.Types.ObjectId,
                    ref: 'Assignments'
                  },
                  grade: {
                    type: String,
                    trim: true,
                  }
                }
              ],
            // // tokens: [{
            //     token: {
            //         type: Array,
            //         // required: true
            //     },
            // }],
            createDate: {
                type: Date,
                required: true,
                default: Date.now
            }
        },

  // Mongoose Virtuals https://mongoosejs.com/docs/tutorials/virtuals.html
  // a property not stored in MongoDB
  // virtuals typically used for computed properties on documents
  // setting virtuals to true to pass properties to response.json()
  {
    toJSON: {
      virtuals: true
    }
  }
);

// RegisterSchema.methods.generateAuthToken = async function () {
//     // Generate an auth token for the user
//     const user = this
//     const token = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET,  { expiresIn: '300m' })
//     user.tokens = user.tokens.concat({token})
//     await user.save()
//     return token
// }


// Mongoose Methods Github https://github.com/Automattic/mongoose
// possible methods PRE HOOK
// // hash user password before saving into database
// RegisterModel.pre('save', (next) => {
//     this.password = bcrypt.hashSync(this.password, saltRounds(10));
//     next();
//     });

// https://mongoosejs.com/docs/api/virtualtype.html#virtualtype_VirtualType-get
// incorporate dynamically-created properties to workoutSchema
// workoutSchema.virtual("totalDuration").get(function () {
//     return this.exercises.reduce((total, exercise) => {
//         return total+exercise.duration
//     }, 0)
// });

const RegisterModel = mongoose.model("Register", RegisterSchema);

module.exports = RegisterModel;