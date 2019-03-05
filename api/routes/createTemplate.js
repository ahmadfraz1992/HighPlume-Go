const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const createTemplate = require("../models/createTemplate");

// process.env.SECRET_KEY = "secret";

router.post("/createTemplate", (req, res, next) => {
  const createTemplateData = new createTemplate({
    Template_name: req.body.checkedRows
  });

  createTemplateData
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Template Created"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/getTemplateInfo", (req, res, next) => {
  createTemplate
    .find()
    .exec()
    .then(Template => {
      // console.log(category);
      return res.status(200).json({
        message: "successful",
        TemplateLocalData: Template
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
