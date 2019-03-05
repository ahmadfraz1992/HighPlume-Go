const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const catType = require("../models/categoryInfo");
const Register = require("../models/registerCustomer");
router.get("/getCustomer", (req, res, next) => {
  var email = req.body.email;
  Register.find()
    .exec()
    .then(customerData => {
      console.log(customerData);
      debugger;
      return res.status(200).json({
        message: "successful",
        customerLocalData: customerData
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/getcatType", (req, res, next) => {
  debugger;
  catType
    .find()
    .exec()
    .then(catTypeData => {
      console.log(catTypeData);
      debugger;
      return res.status(200).json({
        message: "successful",
        catTypeLocalData: catTypeData
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/register", (req, res, next) => {
  Register.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        const register = new Register({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          type: req.body.type,
          templateType: req.body.templateType,
          companyName: req.body.companyName,
          address: req.body.address,
          phoneNo: req.body.phoneNo,
          businessPhoneNo: req.body.businessPhsoneNo,
          businessAddress: req.body.businessAddress,
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
    });
});
module.exports = router;
