const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema(
  {
    // select from an array of disciplines
    // use filter
    courseDiscipline: {
      type: String,
      trim: true,
    },
    // courses within parent discipline
    courseTitle: {
      type: String,
      trim: true,
    },
    courseDescription: {
      type: String,
      trim: true,
    },
    credits: {
      type: Number,
      trim: true,
      // validate: /^[0-9]{0,1}\z/
    },
    students: [{
      // has [] wrapping the {} !!!!!!!!!!
      type: Schema.Types.ObjectId,
      ref: 'RegisterModel',
    }],
    teacherID: {
      type: Schema.Types.ObjectId,
      // type: String,
      ref: 'RegisterModel',
      required: true
    },
    image: {
      data: Buffer,
      contentType: String
    },
    // TOUCH ON THIS LATER
    // activeCourses: {
    //     type: Array,
    //     trim: true,
    // },
    // completedCourses: {
    //     type: Array,
    //     trim: true
    // },
    // array of objects
    gradebook: {
  // has [] wrapping the {} !!!!!!!!!!!
  //   assignments: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'Classroom.assignments'
  //   }],
  //   studentId: [{
  //     type: Schema.Types.ObjectId
  //   }],
  // type: Schema.Types.ObjectId,
  type: String,
  // ref: 'Classroom'
},
  //   email: {
  //       type: String,
  //       validate: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //       required: true
  //   },
  //   password: {
  //       type: String,
  //       validate: /^[0-9A-Za-z!@.,;:'"?-]{6,50}\z/,
  //       required: true
  //   },
  //no required true boolean because access tokens are only issued when logged in
  accessToken: {
  type: String
},
  createDate: {
  type: Date,
  required: true,
  default: Date.now
},
  announcements: [
  {
    title: {
      type: String,
      trim: true,
      required: "Enter an announcement title"
    },
    body: {
      type: String,
      trim: true,
      required: "Enter an announcement message"
    },
    attachment: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true
    },
    comments: [
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: 'RegisterModel',
          required: true
        },
        body: {
          type: String,
          trim: true,
          required: "Enter an announcement message"
        },
      }
    ]
  }
],
  post: [

]
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

// https://mongoosejs.com/docs/api/virtualtype.html#virtualtype_VirtualType-get
// incorporate dynamically-created properties to workoutSchema
// workoutSchema.virtual("totalDuration").get(function () {
//     return this.exercises.reduce((total, exercise) => {
//         return total+exercise.duration
//     }, 0)
// });

const ClassroomModel = mongoose.model("Classroom", ClassroomSchema);

module.exports = ClassroomModel;