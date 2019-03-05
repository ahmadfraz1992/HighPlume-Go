const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const selectedSectionQuestion = require("../models/selectedSectionQuestion");

// process.env.SECRET_KEY = "secret";

router.post("/addSelectedSectionQuestion", (req, res, next) => {
  const selectedSectionData = new selectedSection({
    section_name: req.body.section_name,
    q_id: req.body.q_id,
    q_desc: req.body.q_desc
  });

  selectedSectionData
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

router.get("/getselectedSectionQuestion", (req, res, next) => {
  var section_id = req.query.section_id;
  selectedSectionQuestion
    .find(section_id)
    .exec()
    .then(selectedSectionData => {
      console.log(selectedSectionData);
      return res.status(200).json({
        message: "successful",
        selectedSectionLocalData: selectedSectionData
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
