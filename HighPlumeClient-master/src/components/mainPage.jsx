import React, { Component } from "react";
import "./mainPage.css";
import ani3 from "../Images/ani3.png";
import TextareaAutosize from "react-textarea-autosize";
import { goToTop } from "react-scrollable-anchor";
import axios from "axios";
import $ from "jquery";
var lenOfStartupQuestions = "";
var data;
class mainPage extends Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    $("#spacecharacter").ready(function() {
      let start = Date.now();

      let timer = setInterval(function() {
        let timePassed = Date.now() - start;

        document.getElementById("spacecharacter").style.left =
          timePassed / 1.6 + "px";

        if (timePassed > 2000) clearInterval(timer);
      }, 20);
    });
    // var $anchor = $(this);
    // $("section1").animate(
    //   {
    //     scrollLeft: $($anchor.attr("href")).offset().left
    //   },
    //   1000
    // );
  }
  onSubmit(e) {
    this.props.history.push(`/userTemplate`);
  }
  onSubmit1() {}

  render() {
    return (
      <div className="container">
        <h1>Personal Financial Statment</h1>
        <h2 style={{ color: "white" }}>
          Submitted to : The Bank Of Grain Valley{" "}
        </h2>

        <div
          className="section"
          id="section1"
          style={{
            background: "#c0be85ad",
            marginTop: "2%",
            alignSelf: "center",
            marginLeft: "10%",
            overflow: "hidden"
          }}
        >
          <h2 style={{ color: "white", fontSize: "40px" }}>Instructions </h2>
          <h3 style={{ color: "white" }}>Read carefully!!</h3>
          <img
            id="spacecharacter"
            style={{
              marginTop: "15%",
              marginRight: "200%",
              position: "absolute",
              zIndex: "100"
            }}
            src={ani3}
            alt=""
          />
          <ul style={{ color: "white", textAlign: "left", overflow: "hidden" }}>
            <li>
              Before completing the personal financial statement, please check
              the box that corresponds to the type of statement you will be
              preparing{" "}
            </li>
            <li>
              Complete all of Section 1 by typing your information in the yellow
              blanks. Complete Section 2 if necessary, based on the box you
              checked at the top of the page.
            </li>
            <li>
              Fill in the date in the yellow blank at the top of Section 3.
            </li>
            <li>
              Complete Section 3 by filling in dollar amounts for all of your
              assets and liabilities. DO NOT type a dollar amount for assets and
              liabilities that refer to a schedule (ex. "U.S. Gov't and
              marketable securities - see Schedule A"). For these items, scroll
              down to the appropriate schedule and fill out one row of the
              schedule for each item. The schedules will automatically sum and
              populate the corresponding values in Section 3. Your total assets,
              total liabilities, and net worth will also be filled automatically
              in Section 3.
            </li>
            <li>
              Fill in the date in the yellow blank at the top of Section 4.
            </li>
            <li>
              For Section 4, fill in dollar amounts for each blank for annual
              income and annual expenditures. Total income and total
              expenditures will be filled in automatically. Your annual income
              should match the income reported on your tax return.
            </li>
            <li>
              Complete the contingent liabilities box by checking Yes or No to
              each question. For each "Yes" answer, list the estimated dollar
              amount on the appropriate line and describe your answer in the box
              at the bottom of the section.
            </li>
            <li>
              The schedules should already have been filled out from Section 3.
              Some schedules may be left blank.
            </li>
            <li>
              Please read the paragraph below the schedules. Sign and date at
              the bottom of the form.
            </li>
          </ul>
        </div>

        <button
          id="mainPageButton"
          className="button"
          style={{ alignSelf: "center", marginTop: "2.5%", marginLeft: "50%" }}
          onClick={() => this.onSubmit()}
        >
          Get Started
        </button>
      </div>
    );
  }
}

export default mainPage;
