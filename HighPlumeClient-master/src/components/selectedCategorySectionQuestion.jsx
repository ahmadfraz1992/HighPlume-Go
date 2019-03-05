import React, { Component } from "react";
import "../startup.css";

import axios from "axios";
import $ from "jquery";
var cat_info_db = [];
var questions_from_db = [];
var selectedCategoryQuestionDescription = [];
var selectedCategoryQuestionId = [];
var selectedCategoryQuestion_id;
var sectionQuestiondescription = [];
var sectionQuestionId = [];
var sectionName = [];
var catSection_id;
var sec_ID;
var section_name;
var cat_name;
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class selectedCategorySectionQuestion extends Component {
  constructor() {
    super();
    this.state = {
      c_name: "",
      section_name: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    debugger;
    sec_ID = sessionStorage.getItem("catSection_name");
    //section_name = sessionStorage.getItem("section_name");
    cat_name = sessionStorage.getItem("category");
    //this.setState({ cat_name: cat_name, section_name: section_name });

    axios
      .get("http://localhost:6005/savedSectionQuestion/getSelectedQuestions", {
        params: {
          sec_ID: sec_ID
        }
      })
      .then(response => {
        console.log(response);
        questions_from_db = response.data.templateLocalData;
        console.log(questions_from_db);
        console.log(questions_from_db.length);
        //index = questions_from_db.length;
        section_name = questions_from_db[0].section_name;
        this.setState({ cat_name: cat_name, section_name: section_name });

        //console.log(index);
        debugger;
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

      .catch(err => {
        console.log(err.response);
      });

    $(function() {
      $("#undo_redo").multiselect();
    });
    debugger;
  }
  onSubmit(e) {
    debugger;
    showLoader();

    axios
      .get("http://localhost:6005/category/getCategoryInformation", {
        params: {
          cat_name: cat_name
        }
      })
      .then(response => {
        console.log(response);
        if (cat_name == response.data.categoryLocalData.cat_name) {
          catSection_id = response.data.categoryLocalData._id;
        }
      })
      .catch(error => {
        console.log(error.response);
      });
    let index = 0;
    $("#undo_redo_to > option").each(function() {
      sectionQuestiondescription[index] = $(this).text();
      sectionQuestionId[index] = $(this).val();
      index = index + 1;
      console.log(sectionQuestiondescription);
      console.log(sectionQuestionId);
      console.log(sectionQuestiondescription.length);
    });
    debugger;

    for (let i = 0; i < sectionQuestiondescription.length; i++) {
      debugger;
      const userData = {
        //  section_id: section_id,
        sc_id: catSection_id,
        cat_name: cat_name,
        section_name: section_name,
        q_Id: sectionQuestionId[i],
        q_desc: sectionQuestiondescription[i]
      };

      axios
        .post(
          "http://localhost:6005/filteredSectionQuestion/addFilteredSectionQuestion",
          userData
        )
        .then(response => {
          debugger;
          console.log(response);
          hideLoader();
        })
        .catch(error => {
          console.log(error.response);
        });
      this.props.history.push(`/selectedCategorySection`);
    }
  }

  // onSubmit1(e) {
  //   const userData = {
  //     question: this.state.question
  //   };
  //   showLoader();
  //   axios
  //     .post(
  //       "http://localhost:6005/sectionTemplate/addSectionInformation",
  //       userData
  //     )
  //     .then(response => {
  //       console.log(response);
  //       this.props.history.push(`/sectionTemplate`);
  //       hideLoader();
  //     })
  //     .catch(error => {
  //       console.log(error.response);
  //     });
  // }

  render() {
    //goToTop();
    return (
      <div className="promos">
        <h1>Create a New Category </h1>
        <h2 style={{ color: "white" }}>(Filter Section Questions)</h2>
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
        <form noValidate onSubmit={this.onSubmit}>
          <div style={{ padding: "4%" }}>
            <div
              style={{ alignContent: "center" }}
              id="reg1"
              className="register"
            >
              <input id="tab1" type="radio" name="tabs" defaultChecked="true" />
              <label htmlFor="tab1">Choose Questions</label>

              <section id="content1">
                <div className="col-md-8">
                  <div
                    style={{ paddingLeft: "40%" }}
                    className="input-group mb-3"
                  >
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

                <div className="col-md-8">
                  <div
                    style={{ paddingLeft: "40%" }}
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
                    style={{ paddingTop: "8%", float: "left" }}
                    className="col-md-5"
                  >
                    <select
                      name="questions"
                      id="undo_redo"
                      className="form-control"
                      size="10"
                      multiple="multiple"
                      style={{ overflow: "scroll" }}
                      value={this.state.questions}
                      onChange={this.onChange}
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
                    <button
                      className="btn btn-primary"
                      onClick={() => this.onSubmit()}
                      style={{ marginTop: "67%" }}
                    >
                      Save
                    </button>
                  </div>
                  <div
                    style={{
                      paddingTop: "8%",
                      paddingLeft: "7%",
                      float: "right"
                    }}
                    className="col-md-5"
                  >
                    <select
                      name="to"
                      id="undo_redo_to"
                      className="form-control"
                      size="10"
                      multiple="multiple"
                      style={{ overflow: "scroll" }}
                      onChange={this.getSelectValue}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default selectedCategorySectionQuestion;
