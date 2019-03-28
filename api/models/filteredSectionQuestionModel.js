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
const filteredSectionQuestionSchema = new Schema({
  filtered_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  sc_id: {
    type: Number
  },
  cat_name: {
    type: String
  },
  section_name: {
    type: String
  },
  q_id: {
    type: Number
  },
  q_desc: {
    type: String
  }
});
autoIncrement.initialize(db);
filteredSectionQuestionSchema.plugin(
  autoIncrement.plugin,
  "filteredSectionQuestionSchema"
);
var filteredSectionQuestion = mongoose.model(
  "filteredSectionQuestionSchema",
  filteredSectionQuestionSchema
);
module.exports = mongoose.model(
  "filteredSectionQuestionSelected",
  filteredSectionQuestionSchema
);
