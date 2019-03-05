const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const section = require("../models/section");

// process.env.SECRET_KEY = "secret";

router.post("/addSectionInformation", (req, res, next) => {
  const sectionData = new section({
    section_name: req.body.section_name
  });

  sectionData
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

router.get("/getSectionInformation", (req, res, next) => {
  var section_name = req.body.section_name;
  section
    .find(section_name)
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

module.exports = router;
