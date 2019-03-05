const express = require("express");
const router = express.Router();
const User = require("../models/user");
// const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed at line 12"
        });
      }

      if (req.body.password == user[0].password) {
        // const token = jwt.sign(
        //   {
        //     email: user[0].email,
        //     userId: user[0].user_id
        //   },
        //   process.env.JWT_KEY,
        //   {
        //     expiresIn: "1h"
        //   }
        // );
        return res.status(200).json({
          message: "Auth successful",
          user: user
          //   token: token
        });
      } else {
        return res.status(401).json({
          message: "Auth failed 64"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
