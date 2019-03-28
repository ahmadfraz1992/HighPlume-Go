const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const sectionTemplate = require("../models/sectionTemplateModel");

// process.env.SECRET_KEY = "secret";

router.post("/addSectionInformation", (req, res, next) => {
  const sectionTemplateData = new sectionTemplate({
    s_Id: req.body.s_Id,
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

router.post("/getQuestionId", (req, res, next) => {
  var q_desc = req.body.q_desc;
  sectionTemplate
    .find({ q_desc: q_desc })
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

router.post("/updateQuestion", (req, res, next) => {
  var q_id = req.body.q_id;
  const userData = {
    q_desc: req.body.q_desc,
    tooltip: req.body.tooltip
  };
  sectionTemplate
    .update({ q_id: q_id }, userData)
    .exec()
    .then(sectionTemplateData => {
      //console.log(sectionTemplateData);
      return res.status(200).json({
        message: "Question is updated",
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

router.post("/deleteQuestion", (req, res, next) => {
  var q_id = req.body.q_id;

  sectionTemplate
    .deleteOne({ q_id: q_id })
    .exec()
    .then(sectionTemplateData => {
      //console.log(sectionTemplateData);
      return res.status(200).json({
        message: "Question is deleted",
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
