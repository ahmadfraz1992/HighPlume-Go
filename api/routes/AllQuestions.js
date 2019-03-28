// const express = require("express");
// const router = express.Router();
// const AllQuestion = require("../models/savedTemplateQuestion");
// //get a list of All Questions From DB
// router.post("/savedTemplateQuestions", function(req, res) {
//   res.send({ type: "GET" });
//   try {
//     const Questions = await AllQuestion.find({});
//     res.send(Questions);
//   } catch (error) {
//     res.status(500);
//   }
// });

// router.get("/users", async function(req, res, next) {
//   try {
//     const user = await User.find({});
//     res.send(user);
//   } catch (error) {
//     res.status(500);
//   }
// });
// router.post("/users", (req, res, next) => {
//     const userData = new User({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: req.body.password
//     });
//     userData
//       .save()
//       .then(user => {
//         console.log(user);
//         res.status(201).json({
//           message: "user created",
//           user: user
//         });
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({
//           message: "user not created"
//         });
//       });
//   });
