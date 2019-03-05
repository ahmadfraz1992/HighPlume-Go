const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const selectedCategory = require("../models/selectedCategoryQuestion");

// process.env.SECRET_KEY = "secret";

router.post("/addSelectedCategoryQuestion", (req, res, next) => {
  const selectedCategoryData = new selectedCategory({
    catSection_id: req.body.catSection_id,
    q_id: req.body.q_id,
    q_desc: req.body.q_desc
  });

  selectedCategoryData
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

router.get("/getselectedCategoryQuestion", (req, res, next) => {
  var catSection_id = req.body.catSection_id;
  selectedCategory
    .find(catSection_id)
    .exec()
    .then(selectedCategoryData => {
      console.log(selectedCategoryData);
      return res.status(200).json({
        message: "successful",
        selectedCategoryLocalData: selectedCategoryData
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
