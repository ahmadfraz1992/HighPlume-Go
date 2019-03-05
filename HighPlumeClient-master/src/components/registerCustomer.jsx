import React, { Component } from "react";

import face from "../Images/face.png";
import axios from "axios";
import "../App.css";
import $ from "jquery";
var catType_from_db = [];
var registerdescription = "";
class registerCustomer extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      type: "1",
      templateType: "",
      companyName: "",
      address: "",
      phoneNo: "",
      businessAddress: "",
      businessPhoneNo: "",
      email: "",
      password: "",
      catType: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    $(function() {
      $("#undo_redo").multiselect();
    });
    debugger;
    axios
      .get("http://localhost:6005/category/getCategoryInformation")
      .then(response => {
        //console.log(response);
        catType_from_db = response.data.categoryLocalData;
        console.log(catType_from_db);
        console.log(catType_from_db.length);
        //index = questions_from_db.length;
        var q_Options =
          " <option defaultValue=''>---Select any value---</option>";
        //console.log(index);
        debugger;

        for (var i = 0; i < catType_from_db.length; i++) {
          debugger;
          q_Options +=
            "<option value='" +
            catType_from_db[i]._id +
            "'>" +
            catType_from_db[i].cat_name +
            "   </option>";

          // document.getElementById("undo_redo").innerHTML = q_Options;
        }
        document.getElementById("undo_redo").innerHTML = q_Options;
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  onSubmit(e) {
    e.preventDefault();
    debugger;
    //   $('select[name="catType"]').change(function(){

    //     registerdescription=  $(this).text()
    // });​
    var value1 = document.getElementById("undo_redo").value;
    debugger;
    const userData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      type: this.state.type,
      templateType: value1,
      companyName: this.state.companyName,
      address: this.state.address,
      phoneNo: this.state.phoneNo,
      businessPhoneNo: this.state.businessPhoneNo,
      businessAddress: this.state.businessAddress,
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("http://localhost:6005/customerRegister/register", userData)
      .then(response => {
        console.log(response);
        this.props.history.push(`/login`);
      })
      .catch(error => {
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
                  <i className="fas fa-pencil-alt" />
                  <input
                    name="companyName"
                    type="text"
                    value={this.state.companyName}
                    className="form-control"
                    placeholder="companyName"
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <i className="fas fa-pencil-alt" />
                  <input
                    name="address"
                    type="text"
                    value={this.state.address}
                    className="form-control"
                    placeholder="Address"
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <i className="fas fa-pencil-alt" />
                  <input
                    name="phoneNo"
                    type="text"
                    value={this.state.phoneNo}
                    className="form-control"
                    placeholder="phoneNo"
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <i className="fas fa-pencil-alt" />
                  <input
                    name="businessPhoneNo"
                    type="text"
                    value={this.state.businessPhoneNo}
                    className="form-control"
                    placeholder="businessPhoneNo"
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <i className="fas fa-pencil-alt" />
                  <input
                    name="businessAddress"
                    type="text"
                    value={this.state.businessAddress}
                    className="form-control"
                    placeholder="businessAddress"
                    onChange={this.onChange}
                  />
                </div>

                {/* <div className="form-group">
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
                </div> */}

                <div className="form-group">
                  <select
                    className="form-control"
                    name="templateType"
                    value={this.state.templateType}
                    id="undo_redo"
                    onChange={this.onChange}
                  />
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

export default registerCustomer;
