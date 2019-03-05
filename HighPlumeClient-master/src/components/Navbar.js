import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "../App.css";
import Particles from "react-particles-js";
import axios from "axios";
import $ from "jquery";
var userType;

class Navbar extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/login`);
  }
  componentDidMount() {
    $("[data-toggle=offcanvas]").click(function() {
      $(".row-offcanvas").toggleClass("active");
      $(".collapse")
        .toggleClass("in")
        .toggleClass("hidden-xs")
        .toggleClass("visible-xs");
    });
  }
  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item" style={{ fontSize: 30 }}>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item " style={{ fontSize: 30 }}>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar navbar-expand-lg navbar-nav ">
        <li className="nav-item" style={{ fontSize: 30 }}>
          <Link to="/apply4loan" className="nav-link">
            Apply4loan
          </Link>
        </li>
        <li className="nav-item " style={{ fontSize: 30 }}>
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar1"
          aria-controls="navbar1"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbar1"
        >
          <ul className="navbar-nav">
            <li className="nav-item" style={{ fontSize: 30 }}>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
