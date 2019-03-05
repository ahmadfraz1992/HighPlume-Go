import React, { Component } from "react";
import "../startup.css";

import axios from "axios";
import $ from "jquery";
var sectionName = [];
var catSection_name = "";
var cat_info_db = "";
var cat_id;
var cat_name;
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class selectedCategorySection extends Component {
  constructor() {
    super();
    this.state = {
      c_name: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit1(e) {
    this.props.history.push(`/selectedCategorySectionQuestion`);
  }
  componentDidMount() {
    debugger;
    var catId = sessionStorage.getItem("catinfo_id");
    cat_name = sessionStorage.getItem("category");
    //this.state.c_name = cat_name;
    this.setState({ c_name: cat_name });
    const userData = {
      name: cat_name
    };
    axios
      .get(" http://localhost:6005/category/getCategoryInformation", userData)
      .then(response => {
        console.log(response);
        debugger;
        cat_info_db = response.data.categoryLocalData;

        for (var i = 0; i < cat_info_db.length; i++) {
          if (cat_info_db[i].name == cat_name) {
            //this.setState({ cat_name: cat_name });
            cat_id = cat_info_db[i].cat_id;
          }
        }
      })
      .catch(error => {
        console.log(error.response);
      });

    var divHtml = "";

    //showLoader();

    debugger;
    //(" https://unionloanerserver.herokuapp.com/createCategory/getcategoryInfo")
    axios
      .get(" http://localhost:6005/createcategory/getcategoryInfo", {
        params: {
          catI: catId
        }
      })
      .then(response => {
        debugger;
        console.log(response);
        sectionName = response.data.categoryLocalData;

        divHtml += "<thead  id='thead'>";
        divHtml += " <th style='width:33%'>Row</th>";
        divHtml += " <th style='width:50%'>Selected Section</th>";
        divHtml += "</thead>";
        divHtml += "<tbody >";
        for (var i = 0; i < sectionName.length; i++) {
          divHtml += "<tr>";
          divHtml += "<th id='th3' style='width:50%' >" + i + "</th>";
          divHtml +=
            "<td style='width:50%' hidden>" +
            sectionName[i].section_id +
            "</td>";
          divHtml +=
            "<td style='width:50%'>" + sectionName[i].section_name + "</td>";
          divHtml +=
            "<td style='width:50%'><a  class='btn' style='border:none' id='btn2'><i class='fas fa-edit'></i></a></td>";

          divHtml += "</tr>";
        }

        divHtml += "</tbody>";

        document.getElementById("tablesection").innerHTML = divHtml;
        $("#tablesection tbody").on("click", "#btn2", function() {
          debugger;
          var rowIndex = $(this).closest("tr");
          var uid = $.trim(
            $(rowIndex)
              .find("td:eq(0)")
              .text()
          );
          console.log(uid);
          catSection_name = uid;
          sessionStorage.setItem("catSection_name", uid);
          window.location.replace(
            "http://localhost:3000/selectedCategorySectionQuestion"
          );
        });
        // var MyFunction = this.onSubmit1();
        // el.addEventListener("click", MyFunction, false);

        // hideLoader();
      })
      .catch(error => {
        debugger;
        console.log(error.response);
      });
  }
  onSubmit(e) {
    this.props.history.push(`/category`);
  }

  render() {
    //goToTop();
    return (
      <div className="promos">
        <h1>Create a New Category</h1>
        <h2 style={{ color: "white" }}>(Selected Section)</h2>
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
          </div>
          <table
            className="table table-light"
            id="tablesection"
            style={{ marginTop: "5%" }}
          >
            {/* <thead id="thead">
              <tr>
                <th style={{ width: "33%" }}>Row</th>
                <th style={{ width: "50%" }}>Selected Section</th>
              </tr>
            </thead>
            <tbody>
              <tr id="bodyrow">
                <td style={{ width: "50%" }}>
                  <button
                    className="btn"
                    id="btn2"
                    onClick={() => this.onSubmit1()}
                    style={{ border: "none" }}
                  >
                    <i className="fas fa-eye" />
                  </button>
                </td>
              </tr>
            </tbody> */}
          </table>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.onSubmit()}
        >
          Save
        </button>
      </div>
    );
  }
}

export default selectedCategorySection;
