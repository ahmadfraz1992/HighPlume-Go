import React, { Component } from "react";
import "../startup.css";
import doc1 from "../Images/doc1.png";
import createUser from "../Images/createUser.jpg";
import TextareaAutosize from "react-textarea-autosize";
import { goToTop } from "react-scrollable-anchor";
import axios from "axios";
var companyName = [];
var data;
class adminMain extends Component {
  constructor() {
    super();

    // this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);
    // this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    var divHtml = "";
    var email = sessionStorage.getItem("userEmail");

    axios
      .post("http://localhost:6005/customerRegister/getCustomer")
      .then(response => {
        console.log(response);
        companyName = response.data.customerLocalData;
        divHtml += "<thead  id='thead'>";
        divHtml += " <th style='width:50%' id=''>Row</th>";
        divHtml += " <th style='width:50%'>Company Name</th>";
        divHtml += "</thead><tbody class=''>";
        for (var i = 0; i < companyName.length; i++) {
          divHtml += "<tr>";
          divHtml += "<th style='width:50%'>" + i + "</th>";
          divHtml +=
            "<td style='width:50%'>" + companyName[i].companyName + "</td>";
          divHtml += "</tr>";
        }
        divHtml += "</tbody>";
        document.getElementById("table").innerHTML = divHtml;
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  onSubmit1(e) {
    this.props.history.push(`/registerCustomer`);
  }
  onSubmit2(e) {
    this.props.history.push(`/category`);
  }
  onSubmit3(e) {
    this.props.history.push(`/addQuestions`);
  }
  onSubmit(e) {}

  render() {
    //goToTop();
    return (
      <div className="container">
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
        <h1>List of Startups</h1>
        <table
          className="table table-light"
          id="table"
          style={{ marginTop: "10%" }}
        >
          <thead id="thead">
            <tr id="tableRow">
              <th style={{ color: "white" }}>Row</th>
              <th style={{ color: "white" }}>Company Name</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default adminMain;
