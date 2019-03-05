import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import $ from "jquery";
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
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false // will be true when ajax request is running
    };

    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {}

  onSubmit(e) {
    e.preventDefault();

    debugger;
    showLoader();
    const userData = {
      email: this.state.email,

      password: this.state.password
    };
    // console.log(userData);

    axios
      .post("http://localhost:6005/userLogin/login", userData)
      .then(response => {
        debugger;
        console.log(response);
        hideLoader();
        //data = response.data;

        //sessionStorage.setItem("userData", data);
 
        sessionStorage.setItem("UserID", response.data.user[0]._id);
        sessionStorage.setItem("userEmail", response.data.user[0].email);
        sessionStorage.setItem(
          "startupResponse",
          response.data.startUpResponse
        );
     
     
      
        sessionStorage.setItem("userType", response.data.user[0].type);
      })
      .catch(error => {
        console.log(error.response);
      });
    var email = "";
    email = sessionStorage.getItem("userEmail");
    if (email == this.state.email) {
      this.props.history.push(`/admin`);
    } else {
      axios
        .post("http://localhost:6005/customerLogin/customerlogin", userData)
        .then(response => {
          debugger;
          console.log(response);
          sessionStorage.setItem(
            "userTempType",
            response.data.user[0].templatetype
          );
          hideLoader();
          this.props.history.push(`/mainPage`);
        })
        .catch(error => {
          console.log(error);
        });
    }

    // console.log(response.data.startUpResponse);
    // this.props.history.push(`/apply4loan`);
  }

  render() {
    return (
      <div className="container">
        <div id="loaderdiv" className="overlay">
          <div id="loading-img" />
        </div>
        <div className="modal-dialog text-center">
          <div className="col-sm-9 main-section">
            <div className="modal-content">
              <div className="col-12 user-img">
                <img src={face} alt="" />
              </div>
              <div className="col-12 form-input">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <i className="fas fa-user" id="login1" />
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
                    <i className="fas fa-lock" id="login2" />
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
