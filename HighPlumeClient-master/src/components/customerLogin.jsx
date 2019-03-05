import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";

import face from "../Images/face.png";
import "./particles.js";
import "../App.css";
import { setInStorage, getFromStorage } from "../Utils/storage";
var data;
const particleOpt = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 2000
      }
    }
  }
};
class Login extends Component {
  constructor() {
    super();
    this.state = {
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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    // console.log(userData);
    axios
      .post("http://localhost:6007/user/customerlogin", userData)
      .then(response => {
        debugger;
        console.log(response);
        //data = response.data;

        //sessionStorage.setItem("userData", data);
        sessionStorage.setItem("userData", response.data.user);
        sessionStorage.setItem("UserId", response.data.user[0]._id);
        sessionStorage.setItem("userEmail", response.data.user[0].email);

        sessionStorage.setItem(
          "startupResponse",
          response.data.startUpResponse
        );
        sessionStorage.setItem("userType", response.data.user[0].type);
        if (response.data.user[0].type == "0") {
          this.props.history.push(`/admin`);
        } else {
          // console.log(response.data.startUpResponse);
          this.props.history.push(`/apply4loan`);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <div id="particles-js">
        <div className="modal-dialog text-center">
          <div className="col-sm-9 main-section">
            <div className="modal-content">
              <div className="col-12 user-img">
                <img src={face} alt="" />
              </div>
              <div className="col-12 form-input">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <i className="fas fa-user" />
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <i className="fas fa-lock" />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <button type="submit" className="button">
                    Login
                  </button>
                </form>
              </div>
              <div className="col-12 forgot">
                <a href="#">Forgot Password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
