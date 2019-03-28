import React, { Component } from "react";
import "../startup.css";

import axios from "axios";
import $ from "jquery";
var section_name = [];
var section_id = [];
var sectionData = [];
var cat_id = "";
class categoryInfo extends Component {
  constructor() {
    super();
    this.state = {
      c_name: "",
      c_type: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    var divHtml = "";
    //Getting All Sections From Sections Collections and show them into table
    axios
      .post("http://localhost:6005/createSection/getSectionInfo")
      .then(response => {
        sectionData = response.data.sectionLocalData;
        divHtml += "<thead  id='thead'>";
        divHtml += " <th style='width:10%' id=''>Select</th>";
        divHtml += " <th style='width:10%' id=''>Section_id</th>";
        divHtml += " <th style='width:80%'>Section Name</th>";
        divHtml += "</thead><tbody id='tbody'>";
        for (var i = 0; i < sectionData.length; i++) {
          divHtml += "<tr>";
          divHtml += "<th id='th3' style='width:10%' >";
          divHtml +=
            "<input  id='checkbox' class='form-check-input' type='checkbox' value=''></input>";
          divHtml += "</th>";
          divHtml += "<td style='width:10%'>" + sectionData[i]._id + "</td>";
          divHtml +=
            "<td style='width:80%'>" + sectionData[i].section_name + "</td>";
          divHtml += "</tr>";
        }
        divHtml += "</tbody>";

        document.getElementById("tableSection").innerHTML = divHtml;
      })

      .catch(error => {
        console.log(error.response);
      });
  }

  onSubmit(e) {
    debugger;
    section_id = [];
    section_name = [];
    var index = 0;
    var index1 = 0;
    var checkedRows = [];
    var checkedRowId = [];
    sessionStorage.setItem("category", this.state.c_name);
    const categoryData1 = {
      name: this.state.c_name,
      type: this.state.c_type
    };

    axios
      .post(
        "http://localhost:6005/category/addCategoryInformation",
        categoryData1
      )
      .then(response => {
        console.log(response);
        cat_id = response.data.categoryInformation._id;
        sessionStorage.setItem("catinfo_id", cat_id);

        $("#tbody tr").each(function() {
          if (
            $(this)
              .find("input")
              .is(":checked")
          ) {
            checkedRows.push(
              $(this)
                .find("td:eq(1)")
                .text()
            );
            console.log(checkedRows);
            checkedRowId.push(
              $(this)
                .find("td:eq(0)")
                .text()
            );
            console.log(checkedRowId);
          }
        });
        debugger;
        for (var i = 0; i < checkedRows.length; i++) {
          const categoryInfoData = {
            cat_id: cat_id,
            checkedRows: checkedRows[i],
            checkedRowId: checkedRowId[i]
          };

          axios
            .post(
              "http://localhost:6005/categoryInfo/AddCategoryInfo",
              categoryInfoData
            )
            .then(response => {
              console.log(response);
              this.props.history.push(`/category`);
            })
            .catch(error => {
              console.log(error.response);
            });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <div className="promos">
        <h1 style={{ textAlign: "center", marginTop: "2%" }}>
          Create A New Category
        </h1>
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
              value={this.state.c_name}
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
                value={this.state.c_type}
                onChange={this.onChange}
              />
            </div>
          </div>
          <table
            className="table table-light"
            id="tableSection"
            style={{ marginTop: "15px" }}
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

export default categoryInfo;
