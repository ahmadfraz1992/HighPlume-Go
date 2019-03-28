const express = require("express");
const router = express.Router();
const sectionQuestions = require("../models//savedTemplateQuestionModel");
const savedtemplateQuestion = require("../models//savedTemplateQuestionModel");

router.post("/savedTemplateQuestions", (req, res, next) => {
  var testData = req.body.testUserData;
  console.log(testData);
  savedtemplateQuestion
    .insertMany(testData)
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "saved!",
        savedQuestionLocalData: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/getSectionInformationWithParams", (req, res, next) => {
  var sec_ID = req.body.sec_ID;
  templateQuestion
    .find({ section_id: sec_ID })
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
  var section_id = req.body.section_id;
  sectionQuestions
    .find({ section_id: section_id })
    .exec()
    .then(questions => {
      return res.status(200).json({
        message: "successful",
        sectionLocalData: questions
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.post("/updateSavedQuestion", (req, res, next) => {
  var section_id = req.body.section_id;

  templateQuestion
    .updateMany({ section_id: section_id })
    .exec()
    .then(sectionData => {
      console.log(sectionData);
      return res.status(200).json({
        message: "Section Questions has been updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.post("/deleteSavedQuestion", (req, res, next) => {
  var section_id = req.body.section_id;

  templateQuestion
    .deleteMany({ section_id: section_id })
    .exec()
    .then(sectionData => {
      console.log(sectionData);
      return res.status(200).json({
        message: "Section Questions has been deleted"
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
