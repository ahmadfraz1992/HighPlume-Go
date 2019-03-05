import React, { Component } from "react";
import "../startup.css";

import TextareaAutosize from "react-textarea-autosize";
import { goToTop } from "react-scrollable-anchor";
import axios from "axios";
import $ from "jquery";
var lenOfStartupQuestions = "";
var data;
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class startup extends Component {
  constructor() {
    super();

    this.state = {
      _id: "",
      saved_question: "",
      textarea: ""
      // s_question2: "",
      // s_question3: "",
      // s_question4: "",
      // s_question5: "",
      // s_question6: "",
      // s_question7: "",
      // s_question8: "",
      // s_question9: "",
      // s_question10: "",
      // s_question11: ""
    };
    this.state = {
      _id: "",
      saved_question: "",
      textarea: ""
      // question2: "",
      // question3: "",
      // question4: "",
      // question5: "",
      // question6: "",
      // question7: "",
      // question8: "",
      // question9: "",
      // question10: "",
      // question11: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    debugger;
    var _id = sessionStorage.getItem("UserID");
    var tempType = sessionStorage.getItem("userTempType");
    // var Email = sessionStorage.getItem("userEmail");
    //var _id = startupResponse.data.user[0]._id;
    const userData = {
      _id: _id
    };
    //console.log(userData);
    showLoader();
    axios
      .get(
        "http://localhost:6007/savedStartupQuestions/getSelectedQuestions",
        userData
      )
      .then(response => {
        debugger;
        // this.data = response;
        console.log(response);
        hideLoader();
        var savedStartup = [];

        var divHtml = "";

        savedStartup = response.data.savedStartupLocalData;
        lenOfStartupQuestions = savedStartup.length;
        for (var i = 0; i < lenOfStartupQuestions; i++) {
          if (tempType == savedStartup[i].cat_Id) {
            divHtml += "<div class='row col-md-12  form-group'>";
            divHtml += "<div class='col-md-4'>";
            divHtml +=
              "<label id='" +
              i +
              "class='control-label' style=max-width: '140px'; word-wrap: 'break-word'>" +
              savedStartup[i].q_desc +
              "  </label>";
            divHtml += "</div>";
            divHtml += "<div class='controls col-md-8'>";
            divHtml +=
              "<textarea class='js-auto-size' rows='1' value='{this.state.textarea}' onChange='{this.onChange}' name='textArea' id='" +
              i +
              "' " +
              "style='width:100%;marginTop:10%;' ></textarea>";
            divHtml += "</div>";
            divHtml += "</div>";
          }
        }
        //style = "max-width: 140px; word-wrap: break-word";
        document.getElementById("divHtml").innerHTML = divHtml;

        // var i;
        // for (i = 0; i < len; i++) {

        //     this.setState({ s_question1: startup[i].s_question1 });
        //     this.setState({ s_question2: startup[i].s_question2 });
        //     this.setState({ s_question3: startup[i].s_question3 });
        //     this.setState({ s_question4: startup[i].s_question4 });
        //     this.setState({ s_question5: startup[i].s_question5 });
        //     this.setState({ s_question6: startup[i].s_question6 });
        //     this.setState({ s_question7: startup[i].s_question7 });
        //     this.setState({ s_question8: startup[i].s_question8 });
        //     this.setState({ s_question9: startup[i].s_question9 });
        //     this.setState({ s_question10: startup[i].s_question10 });
        //     this.setState({ s_question11: startup[i].s_question11 });

        // }

        // this.state.s_question1 = financial.s_question1;
        // this.state.s_question2 = financial.s_question2;
        // this.state.s_question3 = financial.s_question3;
        // this.state.s_question4 = financial.s_question4;
      })
      .catch(err => {
        console.log(err.response);
        // response.status(500).json({
        //   error: err
        // });
      });
  }
  onSubmit(e) {
    debugger;
    var UserId = sessionStorage.getItem("UserId");
    var message = "";
    e.preventDefault();
    for (var j = 0; j < lenOfStartupQuestions; j++) {
      message = $("#" + j).val();

      const userData = {
        _id: UserId,
        textarea: message
      };
      showLoader();
      axios
        .post(
          "http://localhost:6007/customerStartupQuestions/startupPage",
          userData
        )
        .then(response => {
          console.log(response);
          hideLoader();
        })
        .catch(error => {
          console.log(error.response);
        });
    }
    this.props.history.push(`/business`);
  }
  onSubmit1() {
    this.props.history.push(`/apply4loan`);
  }

  render() {
    //goToTop();
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <div>
          <div class="overlay">
            <div id="loading-img" />
          </div>
          <h1>Startup Information</h1>
          <div id="reg1" className="register">
            <input id="tab1" type="radio" name="tabs" defaultChecked="true" />
            <label htmlFor="tab1">StartUp</label>
            <section id="content1">
              <div className="container" id="divHtml" />
              {/* <div className=" row form-group required"> */}
              {/* <div className="col-md-4" id="divQuestions"> */}
              {/* <label
                    htmlFor="saved_question"
                    className="control-label  requiredField"
                    style={{ fontSize: "14px" }}
                    //name="saved_question"
                    id="saved_question"
                    value={this.state.saved_question}
                  /> */}
              {/* </div> */}
              {/* <div className="controls col-md-8" id="divTextAreas"> */}
              {/* <textarea
                    className="js-auto-size"
                    rows="1"
                    name="textarea"
                    value={this.state.textarea}
                    onChange={this.onChange}
                    style={{ width: "100%", marginTop: "5%" }}
                  /> */}
              {/* </div> */}
              {/* </div> */}
            </section>
            <button
              type="submit"
              className="btn btn-primary btn-sm "
              style={{
                float: "left",
                display: "block",
                width: "15%",
                margin: "5px 0",
                background: "rgb(41, 138, 45)",
                borderColor: "rgb(41, 138, 45)"
              }}
              onClick={this.onSubmit1}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm "
              style={{
                float: "right",
                display: "block",
                width: "15%",
                margin: "5px 0",
                background: "rgb(41, 138, 45)",
                borderColor: "rgb(41, 138, 45)"
              }}
              onClick={this.onSubmit}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default startup;
