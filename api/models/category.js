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
const categorySchema = new Schema({
  cat_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },

  cat_name: {
    type: String,
    default: ""
  },
  cat_Type: {
    rype: String,
    default: ""
  }
});
autoIncrement.initialize(db);
categorySchema.plugin(autoIncrement.plugin, "categoryHelp");
var category = mongoose.model("category", categorySchema);

module.exports = mongoose.model("category", categorySchema);
