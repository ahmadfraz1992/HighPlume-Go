import React, { Component } from "react";

import face from "../Images/face.png";
import image9 from "../Images/image9.png";
import bp from "../Images/bp.png";
import fp from "../Images/fp.png";
import si from "../Images/si.png";
// import "./apply4loan";
class apply4loan extends Component {
  onSubmit(e) {
    // e.preventDefault();

    // const user = {
    //   email: this.state.email,

    //   password: this.state.password
    // };

    this.props.history.push(`/startup`);
  }
  onSubmit1(e) {
    this.props.history.push(`/business`);
  }
  onSubmit2(e) {
    this.props.history.push(`/financial`);
  }

  render() {
    return (
      <div className="promos">
        <div className="row col-md-12">
          <div className="col-md-4">
            <img
              src={si}
              alt=""
              style={{
                paddingTop: "55%",
                cursor: "pointer"
                // outline: "1px dotted #000"
                // outline: "-webkit-focus-ring-color auto 5px"
              }}
              onClick={() => this.onSubmit()}
            />
            <h2 style={{ color: "white", padding: "8px" }}>
              StartUp Information
            </h2>
            <p style={{ color: "white", padding: "6px" }}>
              Startups concerns possibilities of starting ventures and therefore
              is a design science. Design science uses design principles which
              are a coherent set of normative ideas and propositions to design
              and construct startups
            </p>
          </div>

          <div
            className="col-md-4"

            // style={{ paddingTop: "20%", margintop: "20%" }}
          >
            <img
              src={bp}
              alt=""
              style={{ paddingTop: "55%", cursor: "pointer" }}
              onClick={() => this.onSubmit1()}
            />
            <h2 style={{ color: "white", padding: "17px" }}>Business Plan</h2>
            <p style={{ color: "white", padding: "1px" }}>
              A business plan is a formal statement of business goals, reasons
              they are attainable, and plans for reaching them. It may also
              contain background information about the organization or team
              attempting to reach those goals
            </p>
          </div>

          <div
            className="col-md-4"

            // style={{ paddingTop: "20%", margintop: "20%" }}
          >
            <img
              src={fp}
              alt=""
              style={{ paddingTop: "55%", cursor: "pointer" }}
              onClick={() => this.onSubmit2()}
            />

            <h2 style={{ color: "white", padding: "15px" }}>Financial Plan</h2>
            <p style={{ color: "white", padding: "1px" }}>
              In general usage, a financial plan is a comprehensive evaluation
              of an individual's current pay and future financial state by using
              current known variables to predict future income, asset values and
              withdrawal plans.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default apply4loan;
