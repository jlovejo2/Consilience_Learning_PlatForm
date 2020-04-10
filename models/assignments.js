const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema(
  {
      title: {
          type: String,
          trim: true
      },
      desription: {
          type: String,
          trim: true
      },
      attachments: {
          type: String,
          trim: true
      }
  }
)

const AssignmentModel = mongoose.model("Assignment", AssignmentSchema);

module.exports = AssignmentModel;