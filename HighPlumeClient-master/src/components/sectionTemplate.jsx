import React, { Component } from "react";
import "../startup.css";
import Popup from "reactjs-popup";
import axios from "axios";
import $ from "jquery";
import mul from "multiselect-two-sides";

import { debug } from "util";
var section_info_db = [];
var questions_from_db = [];
var sectionQuestiondescription = [];
var sectionQuestionId = [];
var section_id = "";
var section_name = "";
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class sectionTemplate extends Component {
  constructor() {
    super();
    this.state = {
      section_id: "",
      section_name: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitAddQuestion = this.onSubmitAddQuestion.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    $(function() {
      $("#undo_redo").multiselect();
    });

    section_name = sessionStorage.getItem("sectionName");
    const userData = {
      section_name: section_name
    };
    axios
      .post("http://localhost:6005/createSection/getSectionInfo")
      .then(response => {
        console.log(response);
        //section_id = response.data.sectionLocalData.section_id;
        section_info_db = response.data.sectionLocalData;

        for (var i = 0; i < section_info_db.length; i++) {
          if (section_info_db[i].section_name === section_name) {
            this.setState({ section_name: section_name });
            section_id = section_info_db[i]._id;
            this.setState({ section_id: section_id });
          }
        }
      })
      .catch(error => {
        console.log(error.response);
      });
    axios
      .post("http://localhost:6005/generalQuestions/getGeneralQuestions")
      .then(response => {
        questions_from_db = response.data.generalQuestionsInfo;
        console.log(questions_from_db);
        console.log(questions_from_db.length);

        var q_Options = "";
        for (var i = 0; i < questions_from_db.length; i++) {
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
  }
  onSubmit(e) {
    showLoader();
    let index = 0;
    const userDataArr = [];
    $("#undo_redo_to > option").each(function() {
      sectionQuestiondescription[index] = $(this).text();
      sectionQuestionId[index] = $(this).val();
      userDataArr[index] = {
        section_id: section_id,
        section_name: section_name,
        q_Id: $(this).val(),
        q_desc: $(this).text()
      };
      index = index + 1;
      console.log(sectionQuestiondescription);
      console.log(sectionQuestionId);
      console.log(sectionQuestiondescription.length);
    });

    debugger;
    const test = { testUserData: userDataArr };
    axios
      .post(
        "http://localhost:6005/savedSectionQuestion/savedTemplateQuestions",
        test
      )
      .then(response => {
        debugger;
        console.log(response.data);
        window.location.href = "http://localhost:3000/section";

        hideLoader();
      })
      .catch(error => {
        console.log(error.response);
      });
    //}
  }

  onSubmitAddQuestion(e) {
    const userData = {
      q_desc: this.state.q_desc,
      tooltip: this.state.tooltip
    };

    showLoader();
    axios
      .post("http://localhost:6005/addQuestion/addGeneralQuestion", userData)
      .then(response => {
        debugger;
        console.log(response);
        window.location.reload();
        //this.props.history.push(`/sectionTemplate`);
        hideLoader();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <div className="promos">
        <div className="overlay">
          <div id="loading-img" />
        </div>
        <nav className="main-menu">
          <ul>
            <li>
              <a href="/admin" style={{ marginTop: "30%" }}>
                <i class="fas fa-home fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b> Home</b>
                </span>
              </a>
            </li>

            <li>
              <a href="/showQuestions" style={{ marginTop: "10%" }}>
                <i class="fas fa-plus-square fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b> General Questions</b>
                </span>
              </a>
            </li>

            <li style={{ marginTop: "10%" }}>
              <a href="/section">
                <i class="fas fa-edit fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Section</b>
                </span>
              </a>
            </li>
            <li className="has-subnav" style={{ marginTop: "10%" }}>
              <a href="/category">
                <i class="fas fa-edit fa-2x" />
                <span className=" nav-text" style={{ color: "white" }}>
                  <b>Category</b>
                </span>
              </a>
            </li>
            <li className="dropdown has-subnav" style={{ marginTop: "10%" }}>
              <a href="/templateSelection">
                <i class="fas fa-edit fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Template</b>
                </span>
              </a>
            </li>

            <li className="dropdown has-subnav" style={{ marginTop: "10%" }}>
              <a href="/registerCustomer">
                <i class="fas fa-user-plus fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Register User</b>
                </span>
              </a>
            </li>
          </ul>

          <ul className="logout">
            <li>
              <a href="#">
                <i className="fa fa-power-off fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Logout</b>
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <h1 style={{ textAlign: "center", marginTop: "2%" }}>
          Create a Section Template
        </h1>
        <div className="container">
          <form>
            <div>
              <div
                style={{ alignContent: "center" }}
                id="reg1"
                className="register"
              >
                <input
                  id="tab1"
                  type="radio"
                  name="tabs"
                  defaultChecked="true"
                />
                <label htmlFor="tab1">Choose Questions</label>

                <input id="tab2" type="radio" name="tabs" />
                <label htmlFor="tab2">Add Questions</label>
                <section id="content1">
                  <div className="col-md-8">
                    <div
                      style={{ paddingLeft: "25%" }}
                      className="input-group mb-3"
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text">Section Name</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        name="section_name"
                        value={this.state.section_name}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="row col-md-12">
                    <div
                      style={{ paddingTop: "3%", float: "left" }}
                      className="col-md-5"
                    >
                      <select
                        name="q_desc"
                        id="undo_redo"
                        className="multiselect form-control"
                        size="20"
                        type="multiselect"
                        style={{ overflow: "scroll" }}
                        value={this.state.q_desc}
                        onChange={this.onChange}
                      />
                    </div>
                    <div
                      style={{ paddingTop: "8%", paddingLeft: "8%" }}
                      className="col-md-2"
                    >
                      <button
                        type="button"
                        id="undo_redo_rightAll"
                        className="btn btn-block"
                      >
                        <i className="fas fa-forward" />
                      </button>
                      <button
                        type="button"
                        id="undo_redo_rightSelected"
                        className="btn btn-block"
                      >
                        <i className="fas fa-chevron-right" />
                      </button>
                      <button
                        type="button"
                        id="undo_redo_leftSelected"
                        className="btn btn-block"
                      >
                        <i className="fas fa-chevron-left" />
                      </button>
                      <button
                        type="button"
                        id="undo_redo_leftAll"
                        className="btn btn-block"
                      >
                        <i className="fas fa-backward" />
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.onSubmit()}
                        style={{ marginTop: "100%" }}
                      >
                        Save
                      </button>
                    </div>
                    <div
                      style={{
                        paddingTop: "3%",
                        paddingLeft: "7%",
                        float: "right"
                      }}
                      className="col-md-5"
                    >
                      <select
                        name="to"
                        id="undo_redo_to"
                        className="form-control"
                        size="20"
                        style={{ overflow: "scroll" }}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </section>

                <section id="content2">
                  <div className="promos">
                    <div className="row col-md-12">
                      <div
                        className="input-group mb-3"
                        style={{ paddingTop: "10%" }}
                      >
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-default"
                          >
                            Write your question here
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          name="q_desc"
                          value={this.state.q_desc}
                          onChange={this.onChange}
                        />
                      </div>

                      <div
                        className="input-group mb-3"
                        style={{ paddingTop: "10%" }}
                      >
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-default"
                          >
                            Tooltip
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          name="tooltip"
                          value={this.state.tooltip}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => this.onSubmitAddQuestion()}
                    >
                      Save
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default sectionTemplate;
