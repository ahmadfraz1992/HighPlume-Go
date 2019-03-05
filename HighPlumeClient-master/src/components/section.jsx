import React, { Component } from "react";
import "../App.css";

import axios from "axios";
var sectionName = [];
class section extends Component {
  constructor() {
    super();
    this.state = {
      section_name: "",
      section_desc: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    var divHtml = "";

    axios
      .get("http://localhost:6005/createSection/getSectionInfo")
      .then(response => {
        console.log(response);
        sectionName = response.data.sectionLocalData;
        divHtml += "<thead  id='thead'>";
        divHtml += " <th style='width:50%' id=''>Row</th>";
        divHtml += " <th style='width:50%'>Section Name</th>";
        divHtml += "</thead><tbody class=''>";
        for (var i = 0; i < sectionName.length; i++) {
          divHtml += "<tr>";
          divHtml += "<th style='width:50%'>" + i + "</th>";
          divHtml +=
            "<td style='width:50%'>" + sectionName[i].section_name + "</td>";
          divHtml += "</tr>";
        }
        divHtml += "</tbody>";

        document.getElementById("table").innerHTML = divHtml;
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  onSubmit(e) {
    this.props.history.push(`/createSection`);

    // const userData = {
    //   section_name: this.state.section_name,

    //   section_desc: this.state.section_desc
    // };
    // axios
    //   .post("http://localhost:6005/createSection/createSection", userData)
    //   .then(response => {
    //     console.log(response);
    //     this.props.history.push(`/sectionTemplate`);
    //   })
    //   .catch(error => {
    //     console.log(error.response);
    //   });
  }

  render() {
    //goToTop();
    return (
      <div className="promos">
        <h1>List Of All Sections</h1>
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
        <table
          className="table table-light"
          id="table"
          style={{ marginTop: "10%" }}
        />
        <button onClick={() => this.onSubmit()}>
          <img src="https://img.icons8.com/metro/26/000000/plus-math.png" />
        </button>
      </div>
    );
  }
}

export default section;
