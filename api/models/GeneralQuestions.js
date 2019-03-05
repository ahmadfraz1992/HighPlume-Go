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
const GeneralQuestionsSchema = new Schema({
  s_Id: {
    type: Number,
    autoIncrement: true,
    primarykey: true
  },
  q_Id: {
    type: Number
  },
  q_desc: {
    type: String,
    default: ""
  },
  tooltip: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
GeneralQuestionsSchema.plugin(autoIncrement.plugin, "GeneralQuestionsSchema");
var GeneralQuestions = mongoose.model(
  "GeneralQuestionsSchema",
  GeneralQuestionsSchema
);
module.exports = mongoose.model("GeneralQuestions", GeneralQuestionsSchema);
