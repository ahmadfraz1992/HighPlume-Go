import React, { Component } from "react";

import face from "../Images/face.png";
import axios from "axios";
import "../App.css";
import $ from "jquery";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      type: "",
      email: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // axios
    //   .get("user/register")
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    const userData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      type: this.state.type,
      email: this.state.email,
      password: this.state.password
    };
    debugger;
    var divHtml = "";
    axios
      .post("http://localhost:6005/user/register", userData)
      .then(response => {
        console.log(response);
        this.props.history.push(`/login`);
      })
      .catch(error => {
        //console.log(error.response.request.status);
        // <div class="alert alert-danger" role="alert">
        //   <strong>Conflict!!</strong>This user already exists.
        // </div>;
        // divHtml +=
        //   "<div id='alert1' class='alert alert-danger' role='alert'>";
        // divHtml += "<strong>Conflict!";
        // divHtml += "</strong>";
        // divHtml += "This user already exists.";
        // divHtml += "</div>";
        // document.getElementById("alert1").innerHTML = divHtml;

        $(document).trigger("add-alerts", [
          {
            message: "This user exists.",
            priority: "Conflict"
          }
        ]);

        console.log(error.response);
      });
  }
  render() {
    return (
      <div className="modal-dialog text-center">
        <div className="col-sm-9 main-section">
          <div className="modal-content">
            <div className="col-12 user-img">
              <img src={face} alt="" />
            </div>
            <div className="col-12 form-input">
              <form method="POST" noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <i className="fas fa-pencil-alt" />
                  <input
                    type="text"
                    name="first_name"
                    value={this.state.first_name}
                    className="form-control"
                    placeholder="First Name"
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <i className="fas fa-pencil-alt" />
                  <input
                    name="last_name"
                    type="text"
                    value={this.state.last_name}
                    className="form-control"
                    placeholder="Last Name"
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <select
                    className="form-control"
                    name="type"
                    value={this.state.type}
                    onChange={this.onChange}
                  >
                    <option defaultValue="">---Select any value---</option>
                    <option value="0">Admin</option>
                    <option value="1">Customer</option>
                  </select>
                </div>

                <div className="form-group">
                  <i className="fas fa-user" />
                  <input
                    name="email"
                    type="email"
                    value={this.state.email}
                    className="form-control"
                    placeholder="email"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <i className="fas fa-lock" />
                  <input
                    name="password"
                    value={this.state.password}
                    type="password"
                    className="form-control"
                    placeholder="password"
                    onChange={this.onChange}
                  />
                </div>

                <button type="submit" className="button">
                  Register
                </button>
              </form>
            </div>
            <div className="col-12 forgot">
              <a href="#">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
