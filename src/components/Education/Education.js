import React, { Component } from "react";

export default class Education extends Component {
  render() {
    return (
      <section id="education" className="section section-education">
        <div className="animate-up">
          <h2 className="section-title">Education</h2>
          <div className="timeline">
            <div
              className="timeline-bar"
              style={{ top: "80px", height: "77px" }}
            ></div>
            <div className="timeline-inner clearfix">
              <div className="timeline-box timeline-box-compact timeline-box-left">
                <span className="dot"></span>
                <div className="timeline-box-inner animate-left animated">
                  <span className="arrow"></span>
                  <div className="date">
                    <span>Nov. 2017 - Oct. 2020</span>
                  </div>
                  <img
                    src="./img/hcmus.webp"
                    className={"logoStyle"}
                    alt="HCMUS"
                  />
                  <h3 className="timeline-box-header">
                    Bachelor of Computer Science
                  </h3>
                  <h4>
                    <a href="https://en.hcmus.edu.vn/">University of Science</a>
                    , VNU-HCM, Vietnam.
                  </h4>
                  {/* <b>(GPA : 8.2 ~ 3.3/4.0)</b> */}
                  <p>
                    Thesis :{" "}
                    <a href="https://github.com/hmthanh/GCAT">
                      Link Prediction in Knowledge Graph
                    </a>
                  </p>
                </div>
              </div>

              <div className="timeline-box timeline-box-compact timeline-box-right">
                <span className="dot"></span>
                <div className="timeline-box-inner animate-left animated">
                  <span className="arrow"></span>
                  <div className="date">
                    <span>Oct. 2021 - Now</span>
                  </div>
                  <img src="img/hcmus.webp" className="logoStyle" alt="HCMUS" />
                  <h3 className="timeline-box-header">
                    Master of Information Technology
                  </h3>
                  <h4>
                    <a href="https://en.hcmus.edu.vn/">University of Science</a>
                    , VNU-HCM, Vietnam.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}