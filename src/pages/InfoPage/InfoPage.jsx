import React, { Component } from "react";
import About from "../../components/About/About";
import Accomplishments from "../../components/Accomplishments/Accomplishments";
import Education from "../../components/Education/Education";
import Experience from "../../components/Experience/Experience";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Miscellaneous from "../../components/Miscellaneous/Miscellaneous";
import News from "../../components/News/News";

class InfoPage extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header></Header>
        <div className="content">
          <div className="container">
            <About />
            <News />
            <Education />
            <Experience />
            <Accomplishments />
            <Miscellaneous />
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default InfoPage;
