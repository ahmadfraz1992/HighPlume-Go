const express = require("express");
const app = express();

const registerRoutes = require("./api/routes/userRoute");
const loginRoutes = require("./api/routes/userLoginRoute");
const customerRoutes = require("./api/routes/customerLoginRoute");

const categoryInfoRoutes = require("./api/routes/categoryInfoRoute");

const customerRegisterRoutes = require("./api/routes/customerRegisterRoute");

const createSectionRoutes = require("./api/routes/createSectionRoute");
const sectionTemplateRoutes = require("./api/routes/sectionQuestionRoute");
const savedSectionQuestionRoutes = require("./api/routes/savedTemplateQuestionRoute");
const categoryRoutes = require("./api/routes/categoryRoute");
const selectedSectionQuestionRoutes = require("./api/routes/selectedSectionQuestionRoute");
const selectedCategoryQuestionRoutes = require("./api/routes/selectedCategoryQuestionRoute");
const filteredSectionQuestionRoutes = require("./api/routes/filteredSectionQuestionRoute");
const createTemplateRoutes = require("./api/routes/createTemplateRoute");
const creategeneralQuestionsRoute = require("./api/routes/createGeneralQuestionsRoute");
const generalQuestionsRoute = require("./api/routes/generalQuestionsRoute");
// const sectionClient = require("./HighPlumeClient-master/src/components/section")
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var session = require("express-session");
const path = require("path");
app.use(express.static(path.join(__dirname, "HighPlumeClient-master/build")));

app.get("*", (request, response) => {
  response.sendFile(
    path.join(__dirname, "HighPlumeClient-master/build", "index.html")
  );
});
app.use(cors());
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/admin", {
    useMongoClient: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

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

app.use("/categoryInfo", categoryInfoRoutes);
app.use("/category", categoryRoutes);

app.use("/customerRegister", customerRegisterRoutes);

app.use("/createSection", createSectionRoutes);
app.use("/sectionTemplate", sectionTemplateRoutes);
app.use("/savedSectionQuestion", savedSectionQuestionRoutes);
app.use("/selectedSectionQuestion", selectedSectionQuestionRoutes);
app.use("/selectedCategoryQuestion", selectedCategoryQuestionRoutes);
app.use("/filteredSectionQuestion", filteredSectionQuestionRoutes);
app.use("/createTemplate", createTemplateRoutes);
app.use("/addQuestion", creategeneralQuestionsRoute);
app.use("/generalQuestions", generalQuestionsRoute);

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
