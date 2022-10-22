import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <section id="text-section" className="section section-text">
          <p>
            <span role="img" aria-label=".">
              ✨
            </span>{" "}
            Your ambition outweighed your talent !{" "}
            <span role="img" aria-label=".">
              ✨
            </span>
            <br />
            &copy; 2022 Minh-Thanh Hoang
          </p>
        </section>
      </footer>
    );
  }
}
