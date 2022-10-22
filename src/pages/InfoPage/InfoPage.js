import React, { Component, lazy } from "react";
import Header from "../../components/Header/Header";
import About from "../../components/About/About";
import News from "../../components/News/News";
import Education from "../../components/Education/Education";
import Experience from "../../components/Experience/Experience";
import Accomplishments from "../../components/Accomplishments/Accomplishments";
import Footer from "../../components/Footer/Footer";
const Miscellaneous = lazy(() =>
  import("../../components/Miscellaneous/Miscellaneous")
);

class InfoPage extends Component {
  render() {
    return (
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
    );
  }
}

export default InfoPage;
