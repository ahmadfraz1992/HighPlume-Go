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
const savedSectionQuestionSchema = new Schema({
  savedsection_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  section_name: {
    type: Number
  },
  q_id: {
    type: Number
  },
  q_desc: {
    type: String
  }
});
autoIncrement.initialize(db);
savedSectionQuestionSchema.plugin(
  autoIncrement.plugin,
  "savedSectionQuestionSchema"
);
var savedSectionQuestion = mongoose.model(
  "savedSectionQuestion",
  savedSectionQuestionSchema
);
module.exports = mongoose.model(
  "savedSectionQuestion",
  savedSectionQuestionSchema
);
