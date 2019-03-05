import React, { Component } from "react";
import "../startup.css";
import "../multiselect.min.js";
import $ from "jquery";

import TextareaAutosize from "react-textarea-autosize";
import { goToTop } from "react-scrollable-anchor";
import axios from "axios";
var data;
var questions_from_db = [];
var cat_info_db;
let index = 0;
let counter = 0;
class selectQuestions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      cat_name: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onSubmit2 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    $(function() {
      $("#undo_redo").multiselect();
    });
    debugger;

    axios
      .get("http://localhost:3005/addQuestions/getQuestions")
      .then(response => {
        //console.log(response);
        questions_from_db = response.data.questionsLocalData;
        console.log(questions_from_db);
        console.log(questions_from_db.length);
        //index = questions_from_db.length;
        var q_Options = "<option value='0'></option>";
        //console.log(index);
        debugger;

        for (var i = 2; i < questions_from_db.length; i++) {
          q_Options +=
            "<option value='" +
            i +
            "'>" +
            questions_from_db[i].q_desc +
            "   </option>";
        }
        document.getElementById("undo_redo").innerHTML = q_Options;
      })
      .catch(error => {
        console.log(error.response);
      });

    axios
      .get("http://localhost:3005/categoryInfo/getcategoryInfo")
      .then(response => {
        console.log(response);
        cat_info_db = response.data.categoryLocalData;
        counter = cat_info_db.length;

        this.setState({ cat_name: cat_info_db[counter - 1].name });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  onSubmit1(e) {
    this.props.history.push(`/register`);
  }
  onSubmit2(e) {
    this.props.history.push(`/selectQuestions`);
  }
  onSubmit(e) {}

  render() {
    //goToTop();
    return (
      <div className="container">
        <h1>Add Questions To The Template </h1>
        <div
          style={{
            paddingLeft: "30%",
            paddingTop: "5%"
          }}
          className="row col-md-12"
        >
          <div className="col-md-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Category Name</span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                name="cat_name"
                value={this.state.cat_name}
                onChange={this.onChange}
              />
            </div>
          </div>
        </div>
        <div className="row col-md-12">
          <div style={{ paddingTop: "8%", float: "left" }} className="col-md-5">
            <select
              name="questions"
              id="undo_redo"
              className="form-control"
              size="10"
              multiple="multiple"
              style={{ overflow: "scroll" }}
              // value={this.state.questions}
              // onChange={this.onChange}
            />
          </div>
          <div
            style={{ paddingTop: "9.5%", paddingLeft: "8%" }}
            className="col-md-2"
          >
            <button
              type="button"
              id="undo_redo_rightAll"
              className="btn btn-block"
            >
              <i className="fas fa-forward" />
              {/* <i className="glyphicon glyphicon-forward" /> */}
            </button>
            <button
              type="button"
              id="undo_redo_rightSelected"
              className="btn btn-block"
            >
              <i className="fas fa-chevron-right" />
              {/* <i className="glyphicon glyphicon-chevron-right" /> */}
            </button>
            <button
              type="button"
              id="undo_redo_leftSelected"
              className="btn btn-block"
            >
              <i className="fas fa-chevron-left" />
              {/* <i className="glyphicon glyphicon-chevron-left" /> */}
            </button>
            <button
              type="button"
              id="undo_redo_leftAll"
              className="btn btn-block"
            >
              <i className="fas fa-backward" />
              {/* <i className="glyphicon glyphicon-backward" /> */}
            </button>
          </div>
          <div
            style={{ paddingTop: "8%", paddingLeft: "7%", float: "right" }}
            className="col-md-5"
          >
            <select
              name="to"
              id="undo_redo_to"
              className="form-control"
              size="10"
              multiple="multiple"
              style={{ overflow: "scroll" }}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.onSubmit()}
          style={{ marginTop: "8%" }}
        >
          Save
        </button>
      </div>
    );
  }
}
export default selectQuestions;
