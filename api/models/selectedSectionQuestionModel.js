const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");
mongoose
  .connect(
    "mongodb://localhost:27017/admin",
    {
      // useCreateIndex: true,
      useMongoClient: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
const db = mongoose.connection;

//const autoIncrement = require("mongodb-autoincrement");
const selectedSectionQuestionSchema = new Schema({
  ss_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  section_name: {
    type: String,
    default: ""
  },
  q_id: {
    type: String,
    default: ""
  },
  q_desc: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
selectedSectionQuestionSchema.plugin(
  autoIncrement.plugin,
  "selectedSectionQuestion"
);
var selectedSectionQuestion = mongoose.model(
  "selectedSectionQuestion",
  selectedSectionQuestionSchema
);

module.exports = mongoose.model(
  "selectedSectionQuestion",
  selectedSectionQuestionSchema
);
