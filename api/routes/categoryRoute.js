const express = require("express");
const router = express.Router();
const category = require("../models/categoryModel");
const categoryInfo = require("../models/categoryInfoModel");

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

router.post("/getCategoryInformationWithPara", (req, res, next) => {
  var cat_name = req.body.cat_name;
  category
    .find({ cat_name: cat_name })
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
router.post("/updateCategory", (req, res, next) => {
  var category_id = req.body.cat_id;
  const categoryData = {
    cat_name: req.body.cat_name,
    cat_Type: req.body.cat_Type
  };
  //Update Category Data From categories Collection
  category
    .update({ _id: category_id }, categoryData)
    .exec()
    .then(cat_Data => {
      console.log(cat_Data);
      return res.status(200).json({
        message: "Category has been updated",
        CategoryLocalData: cat_Data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/deleteCategoryData", (req, res, next) => {
  var cat_id = req.body._id;

  category
    .deleteOne({ _id: cat_id })
    .exec()
    .then(deleteSection => {
      console.log(deleteCategory);
      return res.status(200).json({
        message: "Section deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  categoryInfo
    .deleteMany({ cat_id: cat_id })
    .exec()
    .then(deleteCategoryInfo => {
      console.log(deleteCategoryInfo);
      return res.status(200).json({
        message: "Category Info has been deleted"
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
