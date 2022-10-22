import React, { Component } from "react";

export default class News extends Component {
  render() {
    return (
      <section id="news" className="section news-text">
        <div className="animate-up animated">
          <div className="section-box">
            <p>
              HI! I’m studying postgraduate student at the{" "}
              <a href="https://en.hcmus.edu.vn/">
                University of Science, Vietnam National University, Ho Chi Minh
                city
              </a>
              , have solid background knowledge about OOP and Data Structure.
              Proficient Python, Golang, C++, experienced in Web Development,
              CDN service, AWS, a bit of DevOps. With over 4<sup>years</sup>{" "}
              working in industry as software engineer, an enthusiastic about
              coding, I’m willing to devote all my productive time and effort to
              work.
            </p>
            <p></p>
          </div>
        </div>
      </section>
    );
  }
}
