import React, { Component, lazy } from "react";

const InfoPage = lazy(() => import("./InfoPage/InfoPage"));

class MainPage extends Component {
  render() {
    return (
      <main className="main">
        <InfoPage />
      </main>
    );
  }
}

export default MainPage;
