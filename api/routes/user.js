const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var session = require("express-session");
const Register = require("../models/user");

router.get("/", (req, res, next) => {});

router.post("/register", (req, res, next) => {
  Register.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        {
          const register = new Register({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            type: req.body.type,
            email: req.body.email,
            password: req.body.password
          });

          register
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: "User created"
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        }
      }
    });
});

// router.post("/login", (req, res, next) => {
//   Register.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       if (user.length < 1) {
//         return res.status(401).json({
//           message: "Auth failed 56"
//         });
//       }

//       if (req.body.password == user[0].password) {
//         const token = jwt.sign(
//           {
//             email: user[0].email,
//             userId: user[0]._id
//           },
//           process.env.JWT_KEY,
//           {
//             expiresIn: "1h"
//           }
//         );
//         return res.status(200).json({
//           message: "Auth successful",
//           user: user,
//           token: token
//         });
//       } else {
//         return res.status(401).json({
//           message: "Auth failed 64"
//         });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

// router.post("/customerlogin", (req, res, next) => {
//   Customer.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       if (user.length < 1) {
//         return res.status(401).json({
//           message: "Auth failed"
//         });
//       }

//       if (req.body.password == user[0].password) {
//         const token = jwt.sign(
//           {
//             email: user[0].email,
//             userId: user[0]._id
//           },
//           process.env.JWT_KEY,
//           {
//             expiresIn: "1h"
//           }
//         );
//         return res.status(200).json({
//           message: "Auth successful",
//           user: user,
//           token: token
//         });
//       } else {
//         return res.status(401).json({
//           message: "Auth failed 64"
//         });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });
// router.post("/startupPage", (req, res, next) => {
//   console.log(req.body._id);
//   var user_id = req.body._id;
//   Register.findById({ user_id: mongoose.Types.ObjectId(user_id) })
//     .exec()
//     .then(res => {
//       const startupData = new startUp({
//         // id: user._id,
//         s_question1: req.body.s_question1,
//         s_question2: req.body.s_question2,
//         s_question3: req.body.s_question3,
//         s_question4: req.body.s_question4,
//         s_question5: req.body.s_question5,
//         s_question6: req.body.s_question6,
//         s_question7: req.body.s_question7,
//         s_question8: req.body.s_question8,
//         s_question9: req.body.s_question9,
//         s_question10: req.body.s_question10,
//         s_question11: req.body.s_question11
//       });
//       startup
//         .save(startupData)
//         .then(user => {
//           return res.status(200).json({
//             message: "Startup Questions are added"
//           });
//         })
//         .catch(err => {
//           console.log(err);
//           res.status(500).json({
//             error: err
//           });
//         });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

router.delete("/:userId", (req, res, next) => {
  Register.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
