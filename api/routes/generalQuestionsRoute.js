const express = require("express");
const router = express.Router();
const GeneralQuestionsModel = require("../models/GeneralQuestionsModel");
const createQuestionModel = require("../models/GeneralQuestionsModel");

//Add(POST) general Question
router.post("/addGeneralQuestion", (req, res, next) => {
  const addQuestionData = new createQuestionModel({
    q_desc: req.body.q_desc,
    tooltip: req.body.tooltip
  });

  addQuestionData
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Question added"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//GET all general Questions through POST method
router.post("/getGeneralQuestions", (req, res, next) => {
  GeneralQuestionsModel.find()
    .exec()
    .then(generalQuestions => {
      console.log(generalQuestions);
      return res.status(200).json({
        message: "successful",
        generalQuestionsInfo: generalQuestions
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//GET Question By Q_description
router.post("/getQuestionByQDesc", (req, res, next) => {
  var q_desc = req.body.q_desc;
  GeneralQuestionsModel.find({ q_desc: q_desc })
    .exec()
    .then(questionByQDesc => {
      return res.status(200).json({
        message: "successful",
        questionLocalData: questionByQDesc
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//PUT Question By ID
router.post("/updateQuestion", (req, res, next) => {
  var q_id = req.body.q_id;
  const userData = {
    q_desc: req.body.q_desc,
    tooltip: req.body.tooltip
  };
  GeneralQuestionsModel.update({ q_id: q_id }, userData)
    .exec()
    .then(generalQuestions => {
      return res.status(200).json({
        message: "Question is updated",
        generalQuestionsInfo: generalQuestions
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//DELETE Question By ID
router.post("/deleteQuestion", (req, res, next) => {
  var q_id = req.body._id;

  GeneralQuestionsModel.deleteOne({ _id: q_id })
    .exec()
    .then(generalQuestions => {
      console.log(sectionData);
      return res.status(200).json({
        message: "Question has been deleted",
        generalQuestionsInfo: generalQuestions
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
