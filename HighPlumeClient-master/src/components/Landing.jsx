import React, { Component } from "react";

import Particles from "react-particles-js";
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
class Landing extends Component {
  render() {
    return (
      <div className="register">
        <Particles
          params={particleOpt}
          style={{
            display: "block",
            position: "absolute",
            width: "100%",
            height: "100%",
            float: "left"
          }}
        />
        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
        <div className="btext">
          <h1>Union Loaner</h1>
          <p>You think it, We shape it</p>
          <a href="login" id="btn1" className="btn">
            Get Started
          </a>
        </div>

        <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" />

        <script>
          particlesJS.load('particles-js', 'particles.json', function (){" "}
          {console.log("particles.json loaded...")})
        </script>
      </div>
    );
  }
}

export default Landing;
