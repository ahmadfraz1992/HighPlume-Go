const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const createSection = require("../models/createSection");
const getSection = require("../models/createSection");

// process.env.SECRET_KEY = "secret";

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
        message: "Section Created"
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

router.post("/getSectionInformation", (req, res, next) => {
  var section_name = req.body.section_name;
  getSection
    .find({ section_name: section_name })
    .exec()
    .then(sectionData => {
      console.log(sectionData);
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

router.post("/updateSectionData", (req, res, next) => {
  var section_id = req.body.section_id;
  const sectionData = {
    section_name: req.body.section_name,
    section_desc: req.body.section_desc
  };
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
});

router.post("/deleteSection", (req, res, next) => {
  var section_id = req.body._id;

  getSection
    .deleteOne({ _id: section_id })
    .exec()
    .then(sectionData => {
      console.log(sectionData);
      return res.status(200).json({
        message: "Section has been deleted",
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
module.exports = router;
