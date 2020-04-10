const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema(
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
        type: Schema.Types.ObjectId,
        // type: String,
        ref: 'Comment',
        required: true
        }
      ],
      createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    },
    {
      toJSON: {
        // include any virtual properties when data is requested
        virtuals: true
      }
    })

    // AnnouncementSchema.virtual("commentAuthor").get(function () {
    //   // "reduce" array of exercises down to just the sum of their durations
    //   return this.comments.populate({path: 'author'})
    //   }, 0);

    const AnnouncementModel = mongoose.model("Announcement", AnnouncementSchema);

module.exports = AnnouncementModel;