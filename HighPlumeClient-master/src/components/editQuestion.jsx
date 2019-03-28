import React, { Component } from "react";
import "../startup.css";

import axios from "axios";
import $ from "jquery";
import { debug } from "util";
var data;
var q_id;
var questions_from_db = "";
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class editQuestion extends Component {
  constructor() {
    super();
    this.state = {
      q_desc: "",
      tooltip: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    var question_desc = sessionStorage.getItem("question_desc");
    const questionData = {
      q_desc: question_desc
    };
    //get question by ID from generalQuestions Collection for editing the Question
    axios
      .post(
        "http://localhost:6005/generalQuestions/getQuestionByQDesc",
        questionData
      )

      .then(response => {
        debugger;
        console.log(response);
        this.setState({
          q_desc: response.data.questionLocalData[0].q_desc,
          tooltip: response.data.questionLocalData[0].tooltip
        });
        q_id = response.data.questionLocalData[0]._Id;
      })
      .catch(error => {
        console.log(error.response);
      });
    // this.setState({
    //   q_desc: question_desc
    // });
    var divHtml = "";
    axios
      .post("http://localhost:6005/generalQuestions/getGeneralQuestions")
      .then(response => {
        console.log(response);
        questions_from_db = response.data.generalQuestionsInfo;
        divHtml += "<thead  id='thead'>";
        divHtml += " <th style='width:50%' id=''>Row</th>";
        divHtml += " <th style='width:50%'>Questions</th>";
        divHtml += "</thead><tbody class=''>";
        for (var i = 0; i < questions_from_db.length; i++) {
          divHtml += "<tr>";
          divHtml +=
            "<th style='width:50%'>" + questions_from_db[i].q_id + "</th>";
          divHtml +=
            "<td style='width:50%'>" + questions_from_db[i].q_desc + "</td>";
          divHtml +=
            "<td style='width:50%'><a  class='btn' style='border:none' id='btn2'><i class='fas fa-edit'></i></a></td>";
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
          sessionStorage.setItem("sectionName", uid);
          window.location.replace("/sectionEdit");
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  onSubmit(e) {
    const userData = {
      q_id: q_id,
      q_desc: this.state.q_desc,
      Tooltip: this.state.tooltip
    };
    axios
      .post("http://localhost:6005/generalQuestions/updateQuestion", userData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
    this.props.history.push(`/showQuestions`);
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
        <h1 style={{ textAlign: "center", marginTop: "6%" }}>Edit Question</h1>
        <div className="row col-md-12">
          <div className="input-group mb-3" style={{ paddingTop: "10%" }}>
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
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
          <div className="input-group mb-3" style={{ paddingTop: "10%" }}>
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
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
          stye={{ PaddingTop: "10%" }}
          className="btn btn-primary"
          onClick={() => this.onSubmit()}
        >
          Save
        </button>
      </div>
    );
  }
}

export default editQuestion;
