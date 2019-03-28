import React, { Component } from "react";
import "../startup.css";

import axios from "axios";
import $ from "jquery";
var questions_from_db = "";

class showQuestions extends Component {
  constructor() {
    super();
    this.state = {
      question: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    var divHtml = "";
    axios
      .post("http://localhost:6005/generalQuestions/getGeneralQuestions")
      .then(response => {
        console.log(response);
        questions_from_db = response.data.generalQuestionsInfo;
        divHtml += "<thead  id='thead'>";
        divHtml += " <th style='width:20%' id=''>Question ID</th>";
        divHtml += " <th style='width:70%'>General Questions</th>";
        divHtml += "</thead><tbody class=''>";
        for (var i = 0; i < questions_from_db.length; i++) {
          divHtml += "<tr>";
          divHtml +=
            "<th style='width:20px'>" + questions_from_db[i]._id + "</th>";
          divHtml +=
            "<td style='width:70%'>" + questions_from_db[i].q_desc + "</td>";
          divHtml +=
            "<td style='width:5%'><a  class='btn' style='border:none' id='btn2'><i class='fas fa-edit'></i></a></td>";
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
          sessionStorage.setItem("question_desc", uid);
          window.location.replace("/editQuestion");
        });

        $("#table tbody").on("click", "#btn3", function() {
          var rowIndex = $(this).closest("tr");
          var uid = $.trim(
            $(rowIndex)
              .find("td:eq(0)")
              .text()
          );
          var q_id = "";
          console.log(uid);
          for (var i = 0; i < questions_from_db.length; i++) {
            if (uid === questions_from_db[i].q_desc) {
              q_id = questions_from_db[i]._id;
            }
          }
          console.log(q_id);

          const questionData = {
            _id: q_id
          };
          axios
            .post(
              "http://localhost:6005/generalQuestions/deleteQuestion",
              questionData
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
  onSubmiAddQuestion(e) {
    this.props.history.push(`/addQuestion`);
  }
  render() {
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
                  <b> General Questions</b>
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
        <h1 style={{ textAlign: "center", marginTop: "2%" }}>
          General Questions
        </h1>
        <button onClick={() => this.onSubmiAddQuestion()}>
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

export default showQuestions;
