const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const templateQuestion = require("../models/savedTemplateQuestion");

// process.env.SECRET_KEY = "secret";

router.post("/savedTemplateQuestions", (req, res, next) => {
  debugger;
  var testData = req.body.testUserData;
  console.log(testData);
  templateQuestion
    .insertMany(testData)
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "saved!"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(201).json({
        message: "saved!"
      });
    });
  savedTemplateData.insertMany(req.body.testUserData);
});
router.post("/getSectionInformationWithParams", (req, res, next) => {
  var section_id = req.body.section_id;
  section
    .find({section_id:section_id})
    .exec()
    .then(sectionData => {
      //console.log(sectionData);
      return res.status(200).json({
        message: "successful",
        sectionLocalData: sectionData
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.post("/getSelectedQuestions", (req, res, next) => {
  var sec_ID = req.body.sec_ID;
  templateQuestion
    .find({ section_id: sec_ID })
    .exec()
    .then(questions => {
      //console.log(questions);
      return res.status(200).json({
        message: "successful",
        templateLocalData: questions
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
