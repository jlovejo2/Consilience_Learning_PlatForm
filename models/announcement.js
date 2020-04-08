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
          author: {
            type: Schema.Types.ObjectId,
            ref: 'Register',
            required: true
          },
          body: {
            type: String,
            trim: true,
            required: "Enter an announcement message"
          },
        }
      ]
    })

    const AnnouncementModel = mongoose.model("Announcement", AnnouncementSchema);

module.exports = AnnouncementModel;