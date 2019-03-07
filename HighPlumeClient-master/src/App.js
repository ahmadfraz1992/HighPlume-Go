import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { createBrowserHistory } from "react-router";
import Particles from "react-particles-js";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import startup from "./components/startup";
import apply4loan from "./components/apply4loan";
import adminMain from "./components/adminMain";
import selectQuestions from "./components/selectQuestions";
import addQuestions from "./components/addQuestions";
import categoryInfo from "./components/categoryInfo";
import registerCustomer from "./components/registerCustomer";
import mainPage from "./components/mainPage";
import customerLogin from "./components/customerLogin";
import createSection from "./components/createSection";
import sectionTemplate from "./components/sectionTemplate";
import section from "./components/section";
import category from "./components/category";
import userTemplate from "./components/userTemplate";
import selectedCategorySectionQuestion from "./components/selectedCategorySectionQuestion";
import selectedCategorySection from "./components/selectedCategorySection";
import templateSelection from "./components/templateSelection";
//import selectedSectionTemplate from "./components/selectedSectionTemplate";

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
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/startup" component={startup} />
            <Route exact path="/apply4loan" component={apply4loan} />
            <Route exact path="/admin" component={adminMain} />
            <Route exact path="/selectQuestions" component={selectQuestions} />
            <Route exact path="/addQuestions" component={addQuestions} />
            <Route exact path="/categoryInfo" component={categoryInfo} /> */}
            <Route exact path="/mainPage" component={mainPage} />
            <Route exact path="/createSection" component={createSection} />
            <Route exact path="/sectionTemplate" component={sectionTemplate} />
            <Route exact path="/section" component={section} />
            <Route exact path="/category" component={category} />
            <Route exact path="/userTemplate" component={userTemplate} />
            <Route exact path="/templateSelection" component={templateSelection} />
            <Route exact path="/selectedCategorySection" component={selectedCategorySection} />
            <Route exact path="/selectedCategorySectionQuestion" component={selectedCategorySectionQuestion} />
            <Route exact path="/registerCustomer" component={registerCustomer}  />
            <Route exact path="/customerLogin" component={customerLogin} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
