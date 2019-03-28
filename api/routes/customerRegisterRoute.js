const express = require("express");
const router = express.Router();
const Register = require("../models/customerRegisterModel");

router.post("/getCustomer", (req, res, next) => {
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

router.post("/register", (req, res, next) => {
  Register.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "This email address already exists"
        });
      } else {
        {const register = new Register({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            type: req.body.type,
            templatetype: req.body.templateType,
            companyName: req.body.companyName,
            address: req.body.address,
            phoneNo: req.body.phoneNo,
            businessPhoneNo: req.body.businessPhsoneNo,
            businessAddress: req.body.businessAddress,
            email: req.body.email,
            password: req.body.password
          });
          const loginUser = new User({
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
              loginUser
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

module.exports = router;
