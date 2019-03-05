const express = require("express");
const app = express();

const registerRoutes = require("./api/routes/user");
const loginRoutes = require("./api/routes/userLogin");
const customerRoutes = require("./api/routes/customerLogin");

const createCategoryRoutes = require("./api/routes/categoryInfo");

const customerRegisterRoutes = require("./api/routes/customerRegister");

const createSectionRoutes = require("./api/routes/createSection");
const sectionTemplateRoutes = require("./api/routes/sectionQuestion");
const savedSectionQuestionRoutes = require("./api/routes/savedTemplateQuestion");
const categoryRoutes = require("./api/routes/category");
const selectedSectionQuestionRoutes = require("./api/routes/selectedSectionQuestion");
const selectedCategoryQuestionRoutes = require("./api/routes/selectedCategoryQuestion");
const filteredSectionQuestionRoutes = require("./api/routes/filteredSectionQuestion");
const createTemplateRoutes = require("./api/routes/createTemplate");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var session = require("express-session");

app.use(cors());
mongoose.Promise = global.Promise;
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

app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});



app.use("/user", registerRoutes);
app.use("/userLogin", loginRoutes);
app.use("/customerLogin", customerRoutes);

app.use("/createCategory", createCategoryRoutes);
app.use("/category", categoryRoutes);

app.use("/customerRegister", customerRegisterRoutes);

app.use("/createSection", createSectionRoutes);
app.use("/sectionTemplate", sectionTemplateRoutes);
app.use("/savedSectionQuestion", savedSectionQuestionRoutes);
app.use("/selectedSectionQuestion", selectedSectionQuestionRoutes);
app.use("/selectedCategoryQuestion", selectedCategoryQuestionRoutes);
app.use("/filteredSectionQuestion", filteredSectionQuestionRoutes);
app.use("/createTemplate", createTemplateRoutes);
app.use((req, res, next) => {
  const error = new Error("not Found in app.js line 46");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
module.exports = app;
