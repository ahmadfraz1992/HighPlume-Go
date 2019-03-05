const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
mongoose
  .connect(
    "mongodb://localhost:27017/admin",
    {
      useMongoClient: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
const db = mongoose.connection;

const categoryInfoSchema = mongoose.Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  cat_id: {
    type: Number
  },
  section_id: {
    type: Number,
    default: ""
  },
  section_name: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
categoryInfoSchema.plugin(autoIncrement.plugin, "categoryInfo");
var catInfo = mongoose.model("categoryInfo", categoryInfoSchema);
module.exports = mongoose.model("categoryInfo", categoryInfoSchema);
