import React, { Component } from "react";
import { ArrowAltCircleUp } from "./components/Icon/Icon";
import MobileNav from "./components/MobileNav";
import MainPage from "./pages/MainPage";
// const Main = React.lazy(() => import("./pages/MainPage"));
class App extends Component {
  render() {
    return (
      <>
        <MobileNav></MobileNav>
        <div></div>
        <MainPage />
        <a className="btn-scroll-top" href="index.html#">
          <ArrowAltCircleUp />
        </a>
      </>
    );
  }
}

export default App;
