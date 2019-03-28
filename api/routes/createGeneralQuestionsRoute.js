const express = require("express");
const router = express.Router();
const createGeneralQuestionsModel = require("../models/GeneralQuestionsModel");

//Add(POST) general Question
router.post("/addGeneralQuestion", (req, res, next) => {
  const addGeneralQuestions = new createGeneralQuestionsModel({
    q_desc: req.body.q_desc,
    tooltip: req.body.tooltip
  });

  addGeneralQuestions
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        generalQuestionsInfo: result,
        message: "generalQuestions table"
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
