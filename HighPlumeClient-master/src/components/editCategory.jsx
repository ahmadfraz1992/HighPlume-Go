import React, { Component } from "react";
import "../startup.css";

import axios from "axios";
import $ from "jquery";
var data;
var section_name = [];
var section_id = [];
var sectionName = [];
var cat_id = "";
var questions_from_db = "";
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class editCategory extends Component {
  constructor() {
    super();
    this.state = {
      category_name: "",
      category_type: ""
    };

    //this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    var cat_name = sessionStorage.getItem("category_name");
    console.log(cat_name);
    this.setState({ category_name: cat_name });
    const tempData = {
      cat_name: cat_name
    };
    axios
      .post(
        "http://18.222.16.46/category/getCategoryInformationWithPara",
        tempData
      )
      .then(response => {
        console.log(response);
        //cat_id = response.data.categoryLocalData.cat_id;
      })
      .catch(error => {
        console.log(error.response);
      });
    var divHtml = "";
    //showLoader();

    axios
      .post("http://18.222.16.46/createSection/getSectionInfo")
      .then(response => {
        console.log(response);
        sectionName = response.data.sectionLocalData;
        divHtml += "<thead  id='thead'>";
        divHtml += " <th style='width:33%' id=''>Select</th>";
        divHtml += " <th style='width:33%' id=''>Section_id</th>";
        divHtml += " <th style='width:33%'>Section Name</th>";
        divHtml += "</thead><tbody id='tbody'>";
        for (var i = 0; i < sectionName.length; i++) {
          divHtml += "<tr>";
          divHtml += "<th id='th3' style='width:33%' >";
          // divHtml += "<label class='btn btn-success active'> ";
          divHtml +=
            "<input  id='checkbox' class='form-check-input' type='checkbox' value=''></input>";
          divHtml += "</th>";
          divHtml += "<td style='width:33%'>" + sectionName[i]._id + "</td>";
          divHtml +=
            "<td style='width:33%'>" + sectionName[i].section_name + "</td>";
          divHtml += "</tr>";
        }
        divHtml += "</tbody>";

        document.getElementById("tableSection").innerHTML = divHtml;

        // hideLoader();
      })

      .catch(error => {
        console.log(error.response);
      });
  }
  onSubmit(e) {}
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
        <h1>Edit Category </h1>
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
                  <b> Add Questions</b>
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

        <div className="row col-md-12">
          <div className="input-group mb-3" style={{ marginTop: "8%" }}>
            <div className="input-group-prepend">
              <span className="input-group-text">Category Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              name="c_name"
              value={this.state.category_name}
              onChange={this.onChange}
            />
            <div className="input-group mb-3" style={{ paddingTop: "3%" }}>
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default1"
                >
                  Category Type
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default1"
                name="c_type"
                value={this.state.category_type}
                onChange={this.onChange}
              />
            </div>
          </div>
          <table
            className="table table-light"
            id="tableSection"
            style={{ marginTop: "5%" }}
          />
        </div>

        <button
          type="button"
          name="savebtn"
          className="btn btn-primary"
          onClick={() => this.onSubmit()}
        >
          Save
        </button>
      </div>
    );
  }
}

export default editCategory;
