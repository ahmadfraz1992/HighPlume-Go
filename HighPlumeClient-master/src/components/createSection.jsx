import React, { Component } from "react";
import "../startup.css";

import axios from "axios";

class createSection extends Component {
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
  componentDidMount() {}
  onSubmit(e) {
    debugger;
    var sectionName = sessionStorage.setItem(
      "section_name",
      this.state.section_name
    );

    const userData = {
      section_name: this.state.section_name,

      section_desc: this.state.section_desc
    };
    axios
      .post("http://localhost:6005/createSection/createSection", userData)
      .then(response => {
        console.log(response);
        this.props.history.push(`/sectionTemplate`);
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    //goToTop();
    return (
      <div className="promos">
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
              <a href="/admin">
                <i class="fas fa-edit fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Template</b>
                </span>
              </a>
            </li>

            <li className="dropdown has-subnav" style={{ marginTop: "10%" }}>
              <a href="/registerCustomer">
                <i class="fas fa-users fa-2x" />
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
        <h1 style={{ marginTop: "10%" }}>Create a Section</h1>
        <div className="row col-md-12">
          <div className="input-group mb-3" style={{ paddingTop: "13%" }}>
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
            <div className="input-group mb-3" style={{ paddingTop: "5%" }}>
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default1"
                >
                  Section Description
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default1"
                name="section_desc"
                value={this.state.section_desc}
                onChange={this.onChange}
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.onSubmit()}
        >
          Next
        </button>
      </div>
    );
  }
}

export default createSection;
