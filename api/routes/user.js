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
