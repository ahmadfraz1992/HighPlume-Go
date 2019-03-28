import React, { Component } from "react";
import "../startup.css";
import $ from "jquery";
import axios from "axios";

var cat_info_db = [];
var questions_from_db = [];
var userDataTemp = [];
var sectionData;
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class userTemplate extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      cat_name: "",
      question: ""
    };
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    debugger;
    var Template_id = sessionStorage.getItem("userTempType");

    axios
      .post("http://localhost:6005/createCategory/getcategoryInfoTemplate", {
        params: {
          Template_id: Template_id
        }
      })
      .then(response => {
        debugger;

        var divHtml = "";
        userDataTemp = response.data.categoryLocalData;
        console.log(userDataTemp);
        for (var i = 0; i < userDataTemp.length; i++) {
          var sec_ID = userDataTemp[i].section_id;
          axios
            .post("http://localhost:6005/allQuestions/getSelectedQuestions", {
              params: {
                sec_ID: sec_ID
              }
            })
            .then(response => {
              console.log(response.data.templateLocalData);
              debugger;
              sectionData = response.data.templateLocalData;
              //divHtml +=
              //" <div style={{ alignContent: 'center' }} id='reg1' class='container'>";
              for (var j = 0; j < userDataTemp.length; j++) {
                divHtml += "<div class='card' >";
                divHtml +=
                  "<div class='card-header' style='background:#56BB90' ><h2><b> " +
                  userDataTemp[j].section_name +
                  "</b></h2></div>";

                for (var x = 0; x < sectionData.length; x++) {
                  divHtml += "<div class='card-body'>";
                  divHtml += "<div id='userTemp' class='input-group'> ";
                  divHtml +=
                    "<div   class='input-group-text'> <span  class='input-group-prepend' id='Q'" +
                    x +
                    "'>" +
                    sectionData[x].q_desc +
                    "</span> </div> ";
                  divHtml +=
                    " <input  type='text'  class='form-control'   onChange='{this.onChange}' name='textArea' id='" +
                    x +
                    "' >" +
                    "</input></div>  ";
                  divHtml += "</div>";
                }

                divHtml += "</div>";

                document.getElementById("formReg").innerHTML = divHtml;
              }
            })

            .catch(error => {
              console.log(error.response);
            });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  onSubmit() {}
  onSubmit1(e) {}

  render() {
    //goToTop();
    return (
      <div className="container">
        <div className="overlay">
          <div id="loading-img" />
        </div>
        <h1 style={{ fontSize: "55px" }}>User Template</h1>

        <form
          style={{ marginTop: "10%" }}
          noValidate
          onSubmit={this.onSubmit}
          id="formReg"
        />
      </div>
    );
  }
}

export default userTemplate;
