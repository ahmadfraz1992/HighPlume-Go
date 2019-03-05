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
const TemplateSchema = new Schema({
  Template_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  template_cat_id: {
    type: Number
  },
  Template_cat_name: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
TemplateSchema.plugin(autoIncrement.plugin, "Template");
var Template = mongoose.model("Template", TemplateSchema);

module.exports = mongoose.model("Template", TemplateSchema);
