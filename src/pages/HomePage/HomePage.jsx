import About from "../../components/About/About";
import Accomplishments from "../../components/Accomplishments/Accomplishments";
import Education from "../../components/Education/Education";
import Experience from "../../components/Experience/Experience";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Miscellaneous from "../../components/Miscellaneous/Miscellaneous";
import News from "../../components/News/News";
// import { ArrowAltCircleUp } from "../../components/Icon/Icon";
import React, { Component } from "react";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <Header></Header>
          <div className="content">
            <div className="container">
              <About></About>
              <News></News>
              <Education></Education>
              <Experience></Experience>
              <Accomplishments></Accomplishments>
              <Miscellaneous></Miscellaneous>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default HomePage;
