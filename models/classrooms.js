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
      ref: 'Register',
    }],
    teacherID: {
      type: Schema.Types.ObjectId,
      // type: String,
      ref: 'Register',
      required: true
    },
    image: {
      data: Buffer,
      contentType: String
    },
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
    createDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    announcements: [
      {
        type: Schema.Types.ObjectId,
        // type: String,
        ref: 'Announcement',
        required: true
      }
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
  });

// https://mongoosejs.com/docs/api/virtualtype.html#virtualtype_VirtualType-get
// incorporate dynamically-created properties to workoutSchema
// workoutSchema.virtual("totalDuration").get(function () {
//     return this.exercises.reduce((total, exercise) => {
//         return total+exercise.duration
//     }, 0)
// });

const ClassroomModel = mongoose.model("Classroom", ClassroomSchema);

module.exports = ClassroomModel;