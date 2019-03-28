import React, { Component } from "react";
import "../App.css";
import $ from "jquery";
import axios from "axios";
var categoryData = [];
class category extends Component {
  constructor() {
    super();
    this.state = {
      cat_name: "",
      cat_desc: "",
      cat_Id: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    var divHtml = "";

    axios
      .post("http://localhost:6005/category/getCategoryInformationWithoutPara")
      .then(response => {
        console.log(response);
        categoryData = response.data.categoryLocalData;
        debugger;
        divHtml += "<thead  id='thead'>";
        divHtml += " <th style='width:20%' id=''>Category ID</th>";
        divHtml += " <th style='width:70%'>Category Name</th>";
        divHtml += "</thead><tbody class=''>";
        for (var i = 0; i < categoryData.length; i++) {
          divHtml += "<tr>";
          divHtml += "<th style='width:20%'>" + categoryData[i]._id + "</th>";
          divHtml +=
            "<td style='width:70%'>" + categoryData[i].cat_name + "</td>";
          divHtml +=
            "<td style='width:5%'><a   class='btn' style='border:none' id='btn2'><i class='fas fa-edit'></i></a></td>";
          divHtml +=
            "<td style='width:5%'><a  class='btn' style='border:none' id='btn3'><i class='fas fa-trash-alt'></i></a></td>";
          divHtml += "</tr>";
        }
        divHtml += "</tbody>";

        document.getElementById("table").innerHTML = divHtml;

        $("#table tbody").on("click", "#btn2", function() {
          debugger;
          var rowIndex = $(this).closest("tr");
          var uid = $.trim(
            $(rowIndex)
              .find("td:eq(0)")
              .text()
          );
          console.log(uid);
          sessionStorage.setItem("categoryName", uid);
          window.location.replace("/editCategory");
        });
        $("#table tbody").on("click", "#btn3", function() {
          debugger;
          var rowIndex = $(this).closest("tr");
          var uid = $.trim(
            $(rowIndex)
              .find("td:eq(0)")
              .text()
          );
          var cat_id = "";
          for (var i = 0; i < categoryData.length; i++) {
            if (uid === categoryData[i].cat_name) {
              cat_id = categoryData[i]._id;
            }
          }
          console.log(cat_id);

          const deleteCategoryData = {
            _id: cat_id
          };
          axios
            .post(
              "http://localhost:6005/category/deleteCategoryData",
              deleteCategoryData
            )
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error.response);
            });

          var index = $(this)
            .closest("tr")
            .index();
          console.log(uid);
          console.log(index);
          rowIndex = $(this)
            .closest("tr")
            .remove();
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  onSubmit(e) {
    this.props.history.push(`/categoryInfo`);
  }

  render() {
    return (
      <div className="promos">
        <h1 style={{ textAlign: "center", marginTop: "2%" }}>
          List Of All Categories
        </h1>
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
        <button onClick={() => this.onSubmit()}>
          <img src="https://img.icons8.com/metro/26/000000/plus-math.png" />
        </button>
        <table
          className="table table-light"
          id="table"
          style={{ marginTop: "15px" }}
        />
      </div>
    );
  }
}

export default category;
