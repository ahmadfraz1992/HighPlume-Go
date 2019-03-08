import React, { Component } from "react";
import "../startup.css";
import Popup from "reactjs-popup";
import axios from "axios";
import $ from "jquery";
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
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    $(function() {
      $("#undo_redo").multiselect({
        includeSelectAllOption: true,
        maximumSelectionLength: 100
      });
    });

    section_name = sessionStorage.getItem("section_name");
    // this.setState({ section_name: section_name });
    const userData = {
      section_name: section_name
    };
    axios
      .post("http://18.222.16.46/createSection/getSectionInfo")
      .then(response => {
        console.log(response);
        //section_id = response.data.sectionLocalData.section_id;
        section_info_db = response.data.sectionLocalData;

        for (var i = 0; i < section_info_db.length; i++) {
          if (section_info_db[i].section_name == section_name) {
            this.setState({ section_name: section_name });
            section_id = section_info_db[i]._id;
            this.setState({ section_id: section_id });
          }
        }

        // counter = cat_info_db.length;
        // this.setState({ cat_name: cat_info_db[counter - 1].name });
        // cat_id = cat_info_db[counter - 1]._id;
      })
      .catch(error => {
        console.log(error.response);
      });
    //showLoader();
    axios
      .get("http://18.222.16.46/sectionTemplate/getSectionInformation")
      .then(response => {
        //console.log(response);
        //  hideLoader();
        questions_from_db = response.data.templateLocalData;
        console.log(questions_from_db);
        console.log(questions_from_db.length);
        //index = questions_from_db.length;

        //console.log(index);
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
        "http://18.222.16.46/savedSectionQuestion/savedTemplateQuestions",
        test
      )
      .then(response => {
        debugger;
        console.log(response.data);
        alert("Message");
        window.location.href = "http://localhost:3000/section";

        hideLoader();
      })
      .catch(error => {
        console.log(error.response);
      });
    //}
  }

  onSubmit1(e) {
    const userData = {
      question: this.state.question,
      tooltip: this.state.tooltip
    };

    showLoader();
    axios
      .post(
        "http://18.222.16.46/sectionTemplate/addSectionInformation",
        userData
      )
      .then(response => {
        debugger;
        console.log(response);
        // alert("Your Question has been successfully saved.");
        window.location.reload();
        //this.props.history.push(`/sectionTemplate`);
        hideLoader();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    //goToTop();
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
                <i class="fas fa-users fa-2x" />
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
        <h1 style={{}}>Create a Section Template</h1>
        <div className="container">
          <form>
            {/* noValidate onSubmit={this.onSubmit} */}
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
                  <div className="col-md-8 hidden">
                    <div
                      style={{ paddingLeft: "25%" }}
                      className="input-group mb-3"
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text">Section ID</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        name="section_id"
                        value={this.state.section_id}
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
                        name="questions"
                        id="undo_redo"
                        className="multiselect form-control"
                        size="20"
                        type="multiselect"
                        style={{ overflow: "scroll" }}
                        value={this.state.questions}
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
                          name="question"
                          value={this.state.question}
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
                      onClick={() => this.onSubmit1()}
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
