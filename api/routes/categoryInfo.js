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

router.get("/getcategoryInfo", (req, res, next) => {
  //console.log(req.query.catI);
  var catID = req.query.catI;
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
router.get("/getcategoryInfoTemplate", (req, res, next) => {
  
  var  Template_id=req.query.Template_id;
  console.log(Template_id);
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


router.get("/getcategoryInfoWithParam", (req, res, next) => {
  //console.log(req.query.catI);
  var catID = req.query.cat_id;
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

router.get("/getcategoryInfoWithoutPara", (req, res, next) => {
  //console.log(req.query.catI);

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
