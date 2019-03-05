import React, { Component } from "react";
import "../startup.css";

import axios from "axios";

var data;
class addQuestions extends Component {
  constructor() {
    super();
    this.state = {
      question: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const userData = {
      question: this.state.question
    };
    axios
      .post("http://localhost:5000/addQuestions/addQuestions", userData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
    this.props.history.push(`/admin`);
  }

  render() {
    //goToTop();
    return (
      <div className="promos">
        <div className="row col-md-12">
          <div className="input-group mb-3" style={{ paddingTop: "20%" }}>
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Write your question here
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              name="question"
              value={this.state.question}
              onChange={this.onChange}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.onSubmit()}
        >
          Save
        </button>
      </div>
    );
  }
}

export default addQuestions;
