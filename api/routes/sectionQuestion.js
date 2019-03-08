const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); 
const sectionTemplate = require("../models/sectionTemplate");

// process.env.SECRET_KEY = "secret";

router.post("/addSectionInformation", (req, res, next) => {
  const sectionTemplateData = new sectionTemplate({
    //s_Id: s_Id,
    q_desc: req.body.question,
    tooltip: req.body.tooltip
  });

  sectionTemplateData
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "questions Added"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/getSectionInformation", (req, res, next) => {
  sectionTemplate
    .find()
    .exec()
    .then(sectionTemplateData => {
      //console.log(sectionTemplateData);
      return res.status(200).json({
        message: "successful",
        templateLocalData: sectionTemplateData
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
