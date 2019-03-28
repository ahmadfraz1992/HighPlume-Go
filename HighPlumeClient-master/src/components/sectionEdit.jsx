import React, { Component } from "react";
import "../startup.css";
import axios from "axios";
import $ from "jquery";
import mul from "multiselect-two-sides";
var questions_from_db = [];
var section_info_db = [];
var sectionQuestiondescription = [];
var sectionQuestionId = [];
var section_id = "";
var section_name = "";

class sectionEdit extends Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      section_name: "",
      section_desc: ""
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    $(function() {
      $("#undo_redo").multiselect();
    });

    //Getting general questions From DB  and show into the lefside options
    axios
      .post("http://localhost:6005/generalQuestions/getGeneralQuestions")
      .then(response => {
        questions_from_db = response.data.generalQuestionsInfo;
        console.log(questions_from_db);
        console.log(questions_from_db.length);
        var q_Options = "";
        for (var i = 0; i < questions_from_db.length; i++) {
          q_Options +=
            "<option value='" +
            i +
            "'>" +
            questions_from_db[i].q_desc +
            "   </option>";
        }
        document.getElementById("undo_redo").innerHTML = q_Options;
      })
      .catch(error => {
        console.log(error.response);
      });

    var sectionName = sessionStorage.getItem("sectionData");
    console.log(sectionName);
    const secData = {
      section_name: sectionName
    };
    axios
      .post(
        "http://localhost:6005/createSection/getSectionInformation",
        secData
      )
      .then(response => {
        console.log(response);
        debugger;
        this.setState({
          section_name: response.data.sectionLocalData[0].section_name,
          section_desc: response.data.sectionLocalData[0].section_desc
        });
        section_id = response.data.sectionLocalData[0]._id;
        //sending section_id for getting the Saved Section Questions
        const secData1 = {
          section_id: section_id
        };
        axios
          .post(
            "http://localhost:6005/savedSectionQuestion/getSelectedQuestions",
            secData1
          )
          .then(response => {
            console.log(response);
            debugger;
            var sectionQuestions = response.data.sectionLocalData;
            console.log(sectionQuestions);
            console.log(sectionQuestions.length);
            var q_Options = "";
            for (var i = 0; i < sectionQuestions.length; i++) {
              q_Options +=
                "<option value='" +
                i +
                "'>" +
                sectionQuestions[i].q_desc +
                "   </option>";
            }
            document.getElementById("undo_redo_to").innerHTML = q_Options;
          })
          .catch(error => {
            console.log(error.response);
          });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  onSubmit(e) {
    section_name = this.state.section_name;
    let index = 0;
    const userDataArr = [];
    $("#undo_redo_to > option").each(function() {
      sectionQuestiondescription[index] = $(this).text();
      sectionQuestionId[index] = $(this).val();
      userDataArr[index] = {
        section_id: section_id,
        section_name: section_name,
        q_Id: $(this).val(),
        q_desc: $(this).text()
      };
      index = index + 1;
    });

    const secData2 = {
      section_id: section_id,
      section_name: section_name,
      section_desc: this.state.section_desc,
      questionsArray: userDataArr
    };

    axios
      .post("http://localhost:6005/createSection/updateSectionData", secData2)
      .then(response => {
        console.log(response);
        this.props.history.push(`/section`);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  onSubmit2(e) {
    this.props.history.push(`/category`);
  }
  onSubmit3(e) {
    this.props.history.push(`/addQuestions`);
  }

  render() {
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
        <h1>Edit Section</h1>
        <div className="row col-md-12">
          <div className="input-group mb-3" style={{ paddingTop: "2%" }}>
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
          <div className="row col-md-12">
            <div
              style={{ paddingTop: "3.5%", float: "left" }}
              className="col-md-5"
            >
              <select
                name="questions"
                id="undo_redo"
                className="multiselect form-control"
                size="20"
                type="multiselect"
                style={{ overflow: "scroll" }}
                value={this.state.questions}
                onChange={this.onChange}
              />
            </div>
            <div
              style={{ paddingTop: "8%", paddingLeft: "8%" }}
              className="col-md-2"
            >
              <button
                type="button"
                id="undo_redo_rightAll"
                className="btn btn-block"
              >
                <i className="fas fa-forward" />
              </button>
              <button
                type="button"
                id="undo_redo_rightSelected"
                className="btn btn-block"
              >
                <i className="fas fa-chevron-right" />
              </button>
              <button
                type="button"
                id="undo_redo_leftSelected"
                className="btn btn-block"
              >
                <i className="fas fa-chevron-left" />
              </button>
              <button
                type="button"
                id="undo_redo_leftAll"
                className="btn btn-block"
              >
                <i className="fas fa-backward" />
              </button>
              <button
                className="btn btn-primary"
                onClick={() => this.onSubmit()}
                style={{ marginTop: "100%" }}
              >
                Save
              </button>
            </div>
            <div
              style={{
                paddingTop: "3%",
                paddingLeft: "7%",
                float: "right"
              }}
              className="col-md-5"
            >
              <select
                name="to"
                id="undo_redo_to"
                className="form-control"
                size="20"
                style={{ overflow: "scroll" }}
                onChange={this.onChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default sectionEdit;
