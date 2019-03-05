const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const category = require("../models/category");

// process.env.SECRET_KEY = "secret";

router.post("/addCategoryInformation", (req, res, next) => {
  const categoryData = new category({
    cat_name: req.body.name,
    cat_Type: req.body.type
  });

  categoryData
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        categoryInformation: result,
        message: "category table"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/getCategoryInformation", (req, res, next) => {
  var cat_name = req.query.name;
  category
    .find()
    .exec()
    .then(categoryData => {
      console.log(categoryData);
      return res.status(200).json({
        message: "successful",
        categoryLocalData: categoryData
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/getCategoryInformationWithoutPara", (req, res, next) => {
  category
    .find()
    .exec()
    .then(categoryData => {
      console.log(categoryData);
      return res.status(200).json({
        message: "successful",
        categoryLocalData: categoryData
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
