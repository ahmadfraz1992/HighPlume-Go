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

router.post("/getCategoryInformation", (req, res, next) => {
  //var cat_name = req.body.name;
  category
    .find({cat_name: req.body.name})
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

router.post("/getCategoryInformationWithoutPara", (req, res, next) => {
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
