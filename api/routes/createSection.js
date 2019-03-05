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

router.get("/getSectionInfo", (req, res, next) => {
  var name = req.body.section_name;
  //console.log(name);
  getSection
    .find(name)
    .exec()
    .then(section => {
      //console.log(getSection);
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

module.exports = router;
