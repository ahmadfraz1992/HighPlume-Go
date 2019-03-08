const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
const category = require("../models/categoryInfo");
const categoryInfo = require("../models/categoryInfo");
router.post("/categoryInfo", (req, res, next) => {
  const categoryData = new category({
    cat_id: req.body.cat_id,
    section_id: req.body.checkedRowId,
    section_name: req.body.checkedRows
  });
  categoryData
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

router.post("/getcategoryInfo", (req, res, next) => {
  //console.log(req.query.catI);
  var catID = req.body.catI;
  categoryInfo
    .find({ cat_id: catID })
    .exec()
    .then(Category => {
      console.log(Category);
      return res.status(200).json({
        message: "successful",
        categoryLocalData: Category
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//Get information on template
router.post("/getcategoryInfoTemplate", (req, res, next) => {
  var  Template_id=req.body.Template_id;
  categoryInfo
    .find({ cat_id: Template_id })
    .exec()
    .then(Category => {
      console.log(Category);
      return res.status(200).json({
        message: "successful",
        categoryLocalData: Category
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.post("/getcategoryInfoWithParam", (req, res, next) => {
  //console.log(req.query.catI);
  var catID = req.body.cat_id;
  categoryInfo
    .find({ cat_id: catID })
    .exec()
    .then(Category => {
      console.log(Category);
      return res.status(200).json({
        message: "successful",
        categoryLocalData: Category
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/getcategoryInfoWithoutPara", (req, res, next) => {
  categoryInfo
    .find()
    .exec()
    .then(Category => {
      console.log(Category);
      return res.status(200).json({
        message: "successful",
        categoryLocalData: Category
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
