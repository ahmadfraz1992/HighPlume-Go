const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const filteredSectionQuestion = require("../models/filteredSectionQuestion");

// process.env.SECRET_KEY = "secret";

router.post("/addFilteredSectionQuestion", (req, res, next) => {
  const filteredData = new filteredSectionQuestion({
    sc_id: req.body.sc_id,
    cat_name: req.body.cat_name,
    section_name: req.body.section_name,
    q_id: req.body.q_id,
    q_desc: req.body.q_desc
  });

  filteredData
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

router.get("/getFilteredSectionQuestion", (req, res, next) => {
  var cat_name = req.query.cat_name;
  filteredSectionQuestion
    .find({ cat_name: cat_name })
    .exec()
    .then(filteredData => {
      console.log(filteredData);
      return res.status(200).json({
        message: "successful",
        filteredLocalData: filteredData
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
