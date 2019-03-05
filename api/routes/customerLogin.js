const express = require("express");
const router = express.Router();
const customer = require("../models/customerRegister");
// const jwt = require("jsonwebtoken");

router.post("/customerlogin", (req, res, next) => {
  customer
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed 13"
        });
      }

      if (req.body.password == user[0].password) {
        return res.status(200).json({
          message: "Auth successful",
          user: user
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
