import Header from "../../components/Header/Header";
import About from "../../components/About/About";
import News from "../../components/News/News";
import Education from "../../components/Education/Education";
import Experience from "../../components/Experience/Experience";
import Accomplishments from "../../components/Accomplishments/Accomplishments";
import Miscellaneous from "../../components/Miscellaneous/Miscellaneous";
import Footer from "../../components/Footer/Footer";
// import { ArrowAltCircleUp } from "../../components/Icon/Icon";
import React, { Component } from "react";
import { connect } from "react-redux";

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

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
