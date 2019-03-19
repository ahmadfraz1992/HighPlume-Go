import React, { Component } from "react";
import "../startup.css";

import axios from "axios";
import $ from "jquery";
var data;
var questions_from_db = "";
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class showQuestions extends Component {
  constructor() {
    super();
    this.state = {
      question: ""
    };

    //this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    var divHtml = "";
    axios
      .post("http://18.222.16.46/sectionTemplate/getSectionInformation")
      .then(response => {
        console.log(response);
        questions_from_db = response.data.templateLocalData;
        divHtml += "<thead  id='thead'>";
        divHtml += " <th style='width:50%' id=''>Row</th>";
        divHtml += " <th style='width:50%'>Questions</th>";
        divHtml += "</thead><tbody class=''>";
        for (var i = 0; i < questions_from_db.length; i++) {
          divHtml += "<tr>";
          divHtml += "<th style='width:50%'>" + i + "</th>";
          divHtml +=
            "<td style='width:50%'>" + questions_from_db[i].q_desc + "</td>";
          divHtml +=
            "<td style='width:50%'><a  class='btn' style='border:none' id='btn2'><i class='fas fa-edit'></i></a></td>";
          divHtml +=
            "<td style='width:50%'><a  class='btn' style='border:none' id='btn3'><i class='fas fa-trash'></i></a></td>";
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
          sessionStorage.setItem("question_desc", uid);
          window.location.replace("/editQuestion");
        });

        $("#table tbody").on("click", "#btn3", function() {
          debugger;
          var rowIndex = $(this).closest("tr");
          var uid = $.trim(
            $(rowIndex)
              .find("td:eq(0)")
              .text()
          );
          var q_id = "";
          console.log(uid);
          for (var i = 0; i < questions_from_db.length; i++) {
            if (uid == questions_from_db[i].q_desc) {
              q_id = questions_from_db[i]._id;
            }
          }
          console.log(q_id);

          const tempData = {
            q_id: q_id
          };
          axios
            .post(
              "http://18.222.16.46/sectionTemplate/getSectionInformation",
              tempData
            )
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error.response);
            });
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
    // const userData = {
    //   question: this.state.question

    // };
    // axios
    //   .post("http://18.222.16.46/sectionTemplate/addSectionInformation", userData)
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error.response);
    //   });
    this.props.history.push(`/addQuestion`);
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
      <div className="container">
        <nav className="main-menu">
          <ul>
            <li>
              <a href="/admin" style={{ marginTop: "30%" }}>
                <i className="fas fa-home fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b> Home</b>
                </span>
              </a>
            </li>

            <li>
              <a href="/showQuestions" style={{ marginTop: "10%" }}>
                <i className="fas fa-plus-square fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b> Add Questions</b>
                </span>
              </a>
            </li>

            <li style={{ marginTop: "10%" }}>
              <a href="/section">
                <i className="fas fa-edit fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Section</b>
                </span>
              </a>
            </li>
            <li className="has-subnav" style={{ marginTop: "10%" }}>
              <a href="/category">
                <i className="fas fa-edit fa-2x" />
                <span className=" nav-text" style={{ color: "white" }}>
                  <b>Category</b>
                </span>
              </a>
            </li>
            <li className="dropdown has-subnav" style={{ marginTop: "10%" }}>
              <a href="/templateSelection">
                <i className="fas fa-edit fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Template</b>
                </span>
              </a>
            </li>

            <li className="dropdown has-subnav" style={{ marginTop: "10%" }}>
              <a href="/registerCustomer">
                <i className="fas fa-user-plus fa-2x" />
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
        <h1 style={{ textAlign: "center", marginTop: "6%" }}>
          General Questions
        </h1>
        <table
          className="table table-light"
          id="table"
          style={{ marginTop: "5%" }}
        />
        <button onClick={() => this.onSubmit()}>
          <img src="https://img.icons8.com/metro/26/000000/plus-math.png" />
        </button>
      </div>
    );
  }
}

export default showQuestions;
