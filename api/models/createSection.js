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
const sectionSchema = new Schema({
  section_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  section_name: {
    type: String,
    default: ""
  },
  section_desc: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
sectionSchema.plugin(autoIncrement.plugin, "section");
var section = mongoose.model("section", sectionSchema);

module.exports = mongoose.model("section", sectionSchema);
