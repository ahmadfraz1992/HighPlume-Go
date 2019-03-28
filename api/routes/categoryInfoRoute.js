const express = require("express");
const router = express.Router();
const categoryInfo = require("../models/categoryInfoModel");

router.post("/AddCategoryInfo", (req, res, next) => {
  const categoryData = new categoryInfo({
    cat_id: req.body.cat_id,
    section_id: req.body.checkedRowId,
    section_name: req.body.checkedRows
  });
  categoryData
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Category information added",
        categoryInfoLocalData: result
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
  var Template_id = req.body.Template_id;
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

router.post("/updateCategoryInfo", (req, res, next) => {
  var cat_id = req.body.cat_id;
  //DELETE Many Categories From categoryInfo Collection that are matched with the cat_id
  categoryInfo
    .deleteMany({ cat_id: cat_id })
    .exec()
    .then(deleteCategoryInfo => {
      console.log(deleteCategoryInfo);
      return res.status(200).json({
        message: "categoris has been deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

  // const updatedCategoryData = {
  //   section_id: req.body.checkedRowId,
  //   section_name: req.body.checkedRows
  // };
  //INSERT Category Info
  const categoryData = new categoryInfo({
    cat_id: req.body.cat_id,
    section_id: req.body.checkedRowId,
    section_name: req.body.checkedRows
  });
  categoryData
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Category information added",
        categoryInfoLocalData: result
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
