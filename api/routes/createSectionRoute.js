const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const createSection = require("../models/createSectionModel");
const getSection = require("../models/createSectionModel");
const getSectionByName = require("../models/createSectionModel");
const deleteSection = require("../models/createSectionModel");
const templateQuestion = require("../models//savedTemplateQuestionModel");

router.post("/createSection", (req, res, next) => {
  const createSectionData = new createSection({
    section_name: req.body.section_name,
    section_desc: req.body.section_desc
  });

  createSectionData
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Section Created",
        sectionLocalData: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/getSectionInfo", (req, res, next) => {
  getSection
    .find()
    .exec()
    .then(section => {
      return res.status(200).json({
        message: "successful",
        sectionLocalData: section
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//GET a perticuler information of section by section_name
router.post("/getSectionInformation", (req, res, next) => {
  var sec_name = req.body.section_name;
  getSectionByName
    .find({ section_name: sec_name })
    .exec()
    .then(section => {
      console.log(section);
      return res.status(200).json({
        message: "successful",
        sectionLocalData: section
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/updateSectionData", (req, res, next) => {
  var section_id = req.body.section_id;
  const sectionData = {
    section_name: req.body.section_name,
    section_desc: req.body.section_desc
  };
  //Update Section Data From Sections Collection
  getSection
    .update({ _id: section_id }, sectionData)
    .exec()
    .then(sectionData => {
      console.log(sectionData);
      return res.status(200).json({
        message: "Section has been updated",
        sectionLocalData: sectionData
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  //DELETE Many Questions From savedTemplateQuestions Collection that are matched with the Section_id
  templateQuestion
    .deleteMany({ section_id: section_id })
    .exec()
    .then(deleteSectionSavedQuestions => {
      console.log(deleteSectionSavedQuestions);
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
  //INSERT Many Questions in savedTemplateQuestions Collection
  const sectionQuestionsArray = req.body.questionsArray;
  templateQuestion
    .insertMany(sectionQuestionsArray)
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

router.post("/deleteSection", (req, res, next) => {
  var s_id = req.body._id;

  deleteSection
    .deleteOne({ _id: s_id })
    .exec()
    .then(deleteSection => {
      console.log(deleteSection);
      return res.status(200).json({
        message: "Section deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  templateQuestion
    .deleteMany({ section_id: s_id })
    .exec()
    .then(deleteSectionSavedQuestions => {
      console.log(deleteSectionSavedQuestions);
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
