const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const savedTemplateQuestionSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  section_id: {
    type: Number
  },
  section_name: {
    type: String
  },

  q_Id: {
    type: Number
  },
  q_desc: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
savedTemplateQuestionSchema.plugin(
  autoIncrement.plugin,
  "savedTemplateQuestionHelp"
);
var savedTemplateQuestion = mongoose.model(
  "savedTemplateQuestion",
  savedTemplateQuestionSchema
);

module.exports = mongoose.model(
  "savedTemplateQuestion",
  savedTemplateQuestionSchema
);
