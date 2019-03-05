const mongoose = require("mongoose");
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
const customerSchema = new mongoose.Schema({
  customer_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },

  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  type: { type: String, required: true },
  templateType: { type: String, required: true },
  companyName: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  phoneNo: {
    type: String,
    default: ""
  },
  businessPhoneNo: {
    type: String,
    default: ""
  },
  businessAddress: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true }
  // startupQuestions: [loanSchema]
});
autoIncrement.initialize(db);
customerSchema.plugin(autoIncrement.plugin, "customer");
var customer = mongoose.model("customer", customerSchema);

module.exports = mongoose.model("customers", customerSchema);
